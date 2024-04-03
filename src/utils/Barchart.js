import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { Scatter } from "react-chartjs-2"; // Import Scatter component from react-chartjs-2

export default function BasicBars({ seriesData, xAxisLabels }) {
  const [type, setType] = useState("bar");
  const months = xAxisLabels.map((el) =>
    new Date(0, el - 1).toLocaleString("en", { month: "long" })
  );

  // Data for the scatter plot
  const scatterData = {
    labels: months,
    datasets: [
      {
        label: "Scatter Plot",
        data: seriesData.map((value, index) => ({ x: index, y: value })),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        select
        value={type}
        onChange={(event) => setType(event.target.value)}
        label="Series Type"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="line">Line</MenuItem>
        <MenuItem value="bar">Bar</MenuItem>
        <MenuItem value="scatter">Scatter</MenuItem>
      </TextField>

      <div>
        <ResponsiveChartContainer
          series={[
            {
              type,
              data: seriesData,
            },
          ]}
          xAxis={[
            {
              data: months,
              scaleType: "band",
              id: "x-axis-id",
            },
          ]}
          height={200}
        >
          {type === "bar" && <BarPlot valueVisible={true} />}{" "}
          {type === "line" && <LinePlot />}{" "}
          {type === "scatter" && (
            <Scatter
              data={scatterData}
              options={{
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Month'
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Value'
                    }
                  }]
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return `Value: ${tooltipItem.yLabel}`;
                    }
                  }
                }
              }}
            />
          )}
          <ChartsXAxis label="Month" position="bottom" axisId="x-axis-id" />
          <ChartsTooltip labelFormat={(value) => `${value} books`} />
        </ResponsiveChartContainer>
      </div>
    </Box>
  );
}
