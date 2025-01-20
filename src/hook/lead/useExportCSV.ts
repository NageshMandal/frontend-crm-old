import { useEffect, useState } from "react";

import { IStringObject, ITempSettingRes, ITemplate } from "src/utils/types/leads";
import { OBJECT_TYPES } from "src/utils/constants/lead";
import { leadApi } from "src/api/leads";

export const useExportCSV = () => {
  const [exportFields, setExportFields] = useState<IStringObject>({});
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const handleGetFileExportSetting = async () => {
    try {
      if (Object.keys(exportFields).length === 0) {
        const res = (await leadApi.getFileExportsSetting()) as unknown as ITempSettingRes;
        setExportFields(res?.fields.prospect);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleGetTemplate = async () => {
    try {
      const objectType = OBJECT_TYPES.prospects;
      const res = (await leadApi.getFileExportsTemplate(objectType)) as unknown as ITemplate[];
      const newArray = res.map((item) => ({ ...item, name: item.title }));
      setTemplates(newArray);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    handleGetFileExportSetting();
    handleGetTemplate();
  }, []);

  return { exportFields, templates, setTemplates };
};
