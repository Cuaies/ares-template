import i18next from "i18next";
import { AresBaseManager } from "../../lib/classes/baseManager";
import { AresClient } from "../../lib/classes/client";
import { AresError } from "../../lib/classes/error";
import {
  LocalizationNamespaces,
  LogErrorMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import { LocalizationsCollection } from "../../ts/types";
import config from "config";
import AresLocalizationsManagerResults from "./results";
import I18NexFsBackend, { FsBackendOptions } from "i18next-fs-backend";
import { join } from "path";
import {
  LOCALIZATIONS_MANAGER_REQUIRED_DIR,
  LOCALIZATIONS_MANAGER_REQUIRED_PATH,
} from "../../utils/constants";
import { getDirContent } from "../../utils/helpers";
import { isLocale } from "../../utils/typeguards";

export class AresLocalizationsManager extends AresBaseManager {
  readonly results = new AresLocalizationsManagerResults(this.scope);
  declare readonly cache: LocalizationsCollection;

  /**
   * Includes the provider instance, which is responsible for handling the localization processes.
   */
  readonly instance = i18next;

  /**
   * Represents the list of available locales found in the required directory.
   */
  private availableLocales: string[] = [];

  constructor(client: AresClient) {
    super(client, LogScopes.LocalizationsManager);
  }

  /**
   * @param dirPath The path to the required localization directory.
   */
  async init(
    dirPath: string = LOCALIZATIONS_MANAGER_REQUIRED_PATH
  ): Promise<void> {
    await this.checkLocales(dirPath);

    // Provider initialization and plugins setup.
    await i18next.use(I18NexFsBackend).init<FsBackendOptions>({
      ns: Object.values(LocalizationNamespaces),
      preload: this.availableLocales,
      supportedLngs: this.availableLocales,
      lng: config.modules.localization.defaultLocale,
      load: "currentOnly",
      backend: {
        loadPath: join(
          LOCALIZATIONS_MANAGER_REQUIRED_PATH,
          "/{{lng}}/{{ns}}.json"
        ),
        addPath: join(
          LOCALIZATIONS_MANAGER_REQUIRED_PATH,
          "//{{lng}}/{{ns}}.missing.json"
        ),
      },
    });
  }

  /**
   * Checks the integrity of the required localization directory,
   * its structure and contents, and appends to the list of available locales.
   * @param dirPath The path to the required localization directory.
   */
  private async checkLocales(dirPath: string): Promise<void> {
    const dirContent = (await getDirContent(dirPath))[
      LOCALIZATIONS_MANAGER_REQUIRED_DIR
    ];

    if (!dirContent.validDir) {
      throw new AresError(
        this.scope,
        LogErrorMessagesCodes.ManagerRequiredDir,
        LOCALIZATIONS_MANAGER_REQUIRED_DIR
      );
    }

    for (const [locale, dirData] of Object.entries(dirContent.subDirs)) {
      if (!isLocale(locale)) {
        // TODO: warn about invalid locale.
        continue;
      }

      if (!dirData.validDir) {
        // TODO: warn about invalid locale directory.
        continue;
      }

      this.availableLocales.push(locale);
    }
  }
}
