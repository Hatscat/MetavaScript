import { assign, statements } from "./statements.ts";
import { getNestedValue } from "./utils/object.ts";
import { isRecord } from "./utils/type.ts";

/**
 * variable names whose values can be overridden in the output
 */
export enum ReservedVariables {
  EmptyArg = "_",
}

const AVAILABLE_CHAR_FOR_VARIABLES =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TMP_VAR_EDGE = "$$";

export type VarTree = {
  [key: string]: string | VarTree;
};

export function generateTmpVarName(...keysPath: string[]): string {
  return `${TMP_VAR_EDGE}${keysPath.join(".")}${TMP_VAR_EDGE}`;
}

export function provideTmpVarNames<T extends VarTree>(
  record: T,
  ..._keys: string[]
): T {
  return Object.entries(record).reduce(
    (result: T, [key, value]) => ({
      ...result,
      [key]: isRecord(value)
        ? provideTmpVarNames(value, ..._keys, key)
        : generateTmpVarName(..._keys, key),
    }),
    {} as T,
  );
}

export function initVariables(
  varNames: VarTree,
  varValues: VarTree,
  ..._keys: string[]
): string {
  return Object.entries(varNames).reduce(
    (result: string, [key, varName]) =>
      statements(
        result,
        isRecord(varName)
          ? initVariables(varName, varValues, ..._keys, key)
          : assign(varName, String(getNestedValue(varValues, ..._keys, key))),
      ),
    "",
  );
}

export function replaceAllTmpVarNames(
  sourceCode: string,
  unavailableCharacters: string[] = Object.values(ReservedVariables),
): string {
  // Step 1: Compute short and long available variable names
  const availableChars = AVAILABLE_CHAR_FOR_VARIABLES.split("");
  const shortVarNames = availableChars
    .filter((v) => !unavailableCharacters.includes(v));
  const longVarNames = availableChars.reduce(
    (
      vars: string[],
      v,
    ) => [...vars, ...Array.from(Array(10)).map((_, i) => v + i)],
    [],
  );
  const sortedVarNames: readonly string[] = shortVarNames.concat(longVarNames);

  // Step 2: Split build string to get current variable names at odd indexes
  const splittedBuild = sourceCode.split(TMP_VAR_EDGE);

  // Step 3: Count and sort variable usage to use short var names for most used ones
  const tmpVarCountByName: { [currentVar: string]: number } = {};
  for (let i = 1; i < splittedBuild.length; i += 2) {
    const v = splittedBuild[i];
    if (tmpVarCountByName[v]) {
      tmpVarCountByName[v] += 1;
    } else {
      tmpVarCountByName[v] = 1;
    }
  }
  const sortedTmpVarEntries = Object.entries(tmpVarCountByName)
    .sort((a, b) => b[1] - a[1]);

  // Step 4: Assign new variable names in a record
  const newVarNames: { [currentVar: string]: string } = {};
  for (let i = 0; i < sortedTmpVarEntries.length; i++) {
    const v = sortedTmpVarEntries[i][0];
    newVarNames[v] = sortedVarNames[i];
  }

  // Step 5: replace current variables by shorter ones
  for (let i = 1; i < splittedBuild.length; i += 2) {
    const currentVar = splittedBuild[i];
    splittedBuild[i] = newVarNames[currentVar];
  }

  return splittedBuild.join("");
}
