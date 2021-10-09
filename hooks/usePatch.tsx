import {useState} from "react";

export const usePatch = (initialSchema) => {
	const [data, setData] = useState(initialSchema);

	const setField = (field_item) => setData(prevState => ({...prevState, ...field_item}))
	
  return [data, setField, setData];
};
