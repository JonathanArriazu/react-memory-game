import React, { useEffect, useState } from 'react'
import { supabase } from '../helpers/supabaseClient'

const Ranking = () => {

  const [data, setData] = useState([]);

  const getData = async() => {
    const data = await supabase.from("memory-ranking").select('*').order('score', { ascending: false });
    setData(data.data);
  }

  useEffect(() => {
    getData();  
  }, [])

  return (
    <div className="content">
      {
        data &&
          data.map( (item, index) => (
            <div className="item" key={index}>
              <samp>{++index}</samp>
              <samp>{item.name}</samp>
              <samp>{item.score}</samp>
            </div>
          ))
      }
    </div>
  )
}

export default Ranking