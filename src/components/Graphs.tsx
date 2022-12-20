import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3"

import { ExpenseObj } from "../types/Expense";
import { EventOnChange, IncomeObj } from "../types/Source";

interface Data {
    name: string,
    share: number
}

type arr_data = IncomeObj[]|ExpenseObj[];

function Chart (props: {data: arr_data}){
    const svgRef = useRef(null);

    const [data, setData] = useState<Data[]>(
       [
    ]
    )

    const names = data.map(item => item.name)
    const shares = data.map(item => item.share)

    const drawChart = () => {
        d3.select(svgRef.current)
            .select('svg')
            .remove();
        const colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateCool)
            .domain([0, data.length]);
        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr("width", 500)
            .attr("height", 500)
            .style("margin", 10)
            .append('g')
            .attr('transform', `translate(200, 200)`);
        const arcGenerator = d3
            .arc<d3.PieArcDatum<Data>>()
            .innerRadius(0)
            .outerRadius(200);
        const pieGenerator = d3
            .pie<Data>()
            .padAngle(0)
            .value((d) => d.share);
        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter();
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#000000')
            .style('stroke-width', 0)
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.name)
            .style('fill', 'black')
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
    }

    function modify_data(){
        let new_data = props.data.reduce((obj: IncomeObj[], item) => { 
            let find = obj.find(i => i.source === item.source);  
            let _d = {  
              ...item
            }
            find ? (find.amount += item.amount ) : obj.push(_d);
            return obj;
          }, [])

        let modified_data = new_data.map((item)=>{
            return {name: item.source, share: item.amount}
        })

        setData(modified_data)
    }

    useEffect(() => {
        modify_data()
        drawChart()
    }); // redraw chart if data changes

    return <div ref={svgRef}></div>;
};

export default Chart