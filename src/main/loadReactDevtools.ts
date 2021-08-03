import { session } from "electron";
import path from "path";
import fs from "fs/promises";
import os from "os";

export const loadReactDevtools = async () => {
  const extId = "fmkadmapgofadopljbjfkapdkoienihi";
  const extDir = path.join(
    os.homedir(),
    "/Library/Application Support/Google/Chrome/Default/Extensions/",
    extId
  );
  const files = await fs.readdir(extDir);
  const version = files[0];
  if (version === undefined) {
    throw new Error("ReactDevtools not found.");
  }
  const extPath = path.join(extDir, "/", version);
  await session.defaultSession
    .loadExtension(extPath, {
      allowFileAccess: true,
    })
    .catch((err) => {
      throw new Error("Failed to load ReactDevtools.");
    });
};
