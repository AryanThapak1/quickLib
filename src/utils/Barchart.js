import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
export default function BasicBars({ seriesData, xAxisLabels }) {
  const [type, setType] = useState("bar");
  const months = xAxisLabels.map((el) =>
    new Date(0, el - 1).toLocaleString("en", { month: "long" })
  );
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
          <ChartsXAxis label="X Axis" position="bottom" axisId="x-axis-id" />
        </ResponsiveChartContainer>
      </div>
    </Box>
  );
}
