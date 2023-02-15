export enum ReservedCharacters {
  EmptyArg = "_",
}

export const AVAILABLE_CHAR_FOR_VARIABLES =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TMP_VAR_EDGE = "$$";

type VarNames = {
  [key: string]: string | VarNames;
};

export function provideTmpVarNames<VN extends VarNames>(
  record: VN,
  _prefix = "",
): VN {
  return Object.entries(record).reduce(
    (result: VN, [key, value]) => ({
      ...result,
      [key]: typeof value === "string"
        ? `${TMP_VAR_EDGE}${_prefix}${key}${TMP_VAR_EDGE}`
        : provideTmpVarNames(value, `${_prefix}${key}.`),
    }),
    {} as VN,
  );
}

export function replaceAllTmpVarNames(
  sourceCode: string,
  unavailableCharacters: string[] = Object.values(ReservedCharacters),
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
