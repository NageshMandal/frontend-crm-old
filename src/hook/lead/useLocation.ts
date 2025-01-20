import { useEffect, useState } from "react";

import { ISelectOption } from "src/utils/types/index";
import { leadApi } from "src/api/leads";
import { ILocation } from "src/utils/types/leads";

export const useLocation = (query: any) => {
  const [locationOption, setLocationOption] = useState<ISelectOption[]>([]);

  const handleGetLocations = async (q: any) => {
    try {
      const res = (await leadApi.getLocation(q)) as unknown as ILocation[];
      setLocationOption(res?.map((item) => ({ value: item.country, label: item.display_name })));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    handleGetLocations(null);
  }, []);

  useEffect(() => {
    if (query) {
      handleGetLocations(query);
    } else {
      handleGetLocations(null);
    }
  }, [query]);

  return { locationOption };
};
