import { useEffect, useState } from "react";

import { ISelectOption, IUser } from "src/utils/types/index";
import { leadApi } from "src/api/leads";
import { IStage } from "src/utils/types/leads";

export const useMember = () => {
  const [memberOptions, setMembers] = useState<ISelectOption[]>([]);
  const [stageOptions, setStateOptions] = useState<ISelectOption[]>([]);

  const handleGetMembers = async () => {
    try {
      const res = (await leadApi.getTeam()) as unknown as any;
      const stages: IStage[] = res?.field_settings;
      const members: IUser[] = res?.members;
      setMembers(members?.map((item) => ({ value: item.id, label: item.full_name })));
      setStateOptions(stages?.map((item) => ({ value: item.id, label: item.value })));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    handleGetMembers();
  }, []);

  return { memberOptions, stageOptions };
};
