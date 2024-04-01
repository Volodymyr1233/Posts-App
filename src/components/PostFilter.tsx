import React from 'react';
import { Filter } from "../models/Filter";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";


interface Props {
    filterObj: Filter;
    setFilterObj: React.Dispatch<React.SetStateAction<Filter>>,
}

const PostFilter = ({filterObj, setFilterObj}: Props) => {
    return (
        <div>
            <MyInput 
            value={filterObj.query}
            onChange={e => setFilterObj({...filterObj, query: e.target.value})}
            placeholder="Search posts..."/>

            <MySelect 
            value={filterObj.sort}
            onChange={selectedSort => setFilterObj({...filterObj, sort: selectedSort})}
            defaultValue='Sort by'
            options={[
            {value: 'title', name: "title"},
            {value: 'body', name: "description"},
            ]}/>
        </div>
    )
}

export default PostFilter;