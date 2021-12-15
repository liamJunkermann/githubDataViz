import * as React from "react";
import * as d3 from "d3";

export interface IBarChartProps {
  data: any;
}

export function BarChart(props: IBarChartProps) {
  const ref = React.useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = () => {
    d3.selectAll("svg > *").remove(); // Clears existing chart if exists

    let barColor = "blue";
    let textColor = "black";

    let barWidth = 80;
    let gap = 5;
    let svgWidth = 1000;
    let svgHeight = 400;

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let sourceNames = [];
    let soucreValues = [];
    for (let key in props.data) {
      if (props.data.hasOwnProperty(key)) {
        sourceNames.push(key);
        soucreValues.push(props.data[key]);
      }
    }

    let gapArr = [];
    for (let i = 0; i < sourceNames.length; i++) {
      if (i === sourceNames.length - 1) gapArr.push(0);
      else gapArr.push(gap);
    }

    let xLength = (barWidth + gap) * sourceNames.length;

    let x = d3.scaleBand().rangeRound([0, xLength]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(sourceNames);
    y.domain([
      0,
      d3.max(soucreValues, function (d) {
        return d;
      }),
    ]);

    let svg = d3.select(ref.current).append("svg");
    svg.attr("height", svgHeight).attr("width", svgWidth);

    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    let bars = svg.selectAll(".bar").data(sourceNames).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d: string) {
        return x(d)!;
      })
      .attr("y", function (d) {
        return y(props.data[d]);
      })
      .attr("width", barWidth)
      .attr("height", 0)
      .attr("fill", barColor)
      .transition()
      .duration(600)
      .attr("height", (d) => height - y(props.data[d]));

    bars
      .append("text")
      .text(function (d) {
        return props.data[d];
      })
      .attr("x", function (d: string) {
        return x(d)! + barWidth / 2;
      })
      .attr("y", function (d) {
        return y(props.data[d]) - gap;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", textColor)
      .attr("text-anchor", "middle");
  };

  React.useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <div className="chart">
      <svg ref={ref} viewBox="0 0 1000 1000" />
    </div>
  );
}
