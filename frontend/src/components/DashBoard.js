import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import DataService from "./DataService";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    DataService.getData().then((response) => {
      setData(response.data);
      setFilteredData(response.data);
      createCharts(response.data);
    });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  //   const applyFilters = () => {
  //     let updatedData = data;

  //     if (filters.endYear) {
  //       updatedData = updatedData.filter(
  //         (d) => d.end_year === Number(filters.endYear)
  //       );
  //     }
  //     if (filters.topic) {
  //       updatedData = updatedData.filter(
  //         (d) => d.topic.toLowerCase() === filters.topic.toLowerCase()
  //       );
  //     }
  //     if (filters.sector) {
  //       updatedData = updatedData.filter(
  //         (d) => d.sector.toLowerCase() === filters.sector.toLowerCase()
  //       );
  //     }
  //     if (filters.region) {
  //       updatedData = updatedData.filter(
  //         (d) => d.region.toLowerCase() === filters.region.toLowerCase()
  //       );
  //     }
  //     if (filters.pest) {
  //       updatedData = updatedData.filter(
  //         (d) => d.pestle.toLowerCase() === filters.pest.toLowerCase()
  //       );
  //     }
  //     if (filters.source) {
  //       updatedData = updatedData.filter(
  //         (d) => d.source.toLowerCase() === filters.source.toLowerCase()
  //       );
  //     }
  //     if (filters.swot) {
  //       updatedData = updatedData.filter(
  //         (d) => d.swot.toLowerCase() === filters.swot.toLowerCase()
  //       );
  //     }
  //     if (filters.country) {
  //       updatedData = updatedData.filter(
  //         (d) => d.country.toLowerCase() === filters.country.toLowerCase()
  //       );
  //     }
  //     if (filters.city) {
  //       updatedData = updatedData.filter(
  //         (d) => d.city.toLowerCase() === filters.city.toLowerCase()
  //       );
  //     }

  //     setFilteredData(updatedData);
  //     createCharts(updatedData);
  //   };

  const applyFilters = () => {
    let updatedData = data;

    const filtersApplied = Object.keys(filters).filter((key) => filters[key]);

    filtersApplied.forEach((filterKey) => {
      if (filterKey === "endYear") {
        updatedData = updatedData.filter(
          (d) => d.end_year === Number(filters.endYear)
        );
      } else {
        updatedData = updatedData.filter(
          (d) => d[filterKey].toLowerCase() === filters[filterKey].toLowerCase()
        );
      }
    });

    setFilteredData(updatedData);
    createCharts(updatedData);
  };

  const createCharts = (data) => {
    createBarChart(data, "intensity", "#intensityChart", "Intensity");
    createBarChart(data, "likelihood", "#likelihoodChart", "Likelihood");
    createBarChart(data, "relevance", "#relevanceChart", "Relevance");
    createBarChart(data, "year", "#yearChart", "Year");
    createBarChart(data, "country", "#countryChart", "Country");
    createBarChart(data, "topic", "#topicChart", "Topics");
    createBarChart(data, "region", "#regionChart", "Region");
    createBarChart(data, "city", "#cityChart", "City");
  };

  const createBarChart = (data, key, selector, title) => {
    d3.select(selector).select("svg").remove(); // Clear previous chart

    const svg = d3
      .select(selector)
      .append("svg")
      .attr("width", 800)
      .attr("height", 400);

    const margin = { top: 40, right: 30, bottom: 40, left: 90 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;

    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(title);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[key]))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d[key])])
      .nice()
      .range([height, 0]);

    g.append("g").call(d3.axisLeft(y));

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[key]))
      .attr("y", (d) => y(+d[key]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(+d[key]))
      .attr("fill", "steelblue");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      endYear: "",
      topic: "",
      sector: "",
      region: "",
      pest: "",
      source: "",
      swot: "",
      country: "",
      city: "",
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Made By Koushik
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by End Year"
            name="endYear"
            value={filters.endYear}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Topic"
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Sector"
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Region"
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by PESTLE"
            name="pest"
            value={filters.pest}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Source"
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by SWOT"
            name="swot"
            value={filters.swot}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by Country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        sx={{ mr: 2 }}
      >
        Apply Filters
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetFilters}>
        Reset Filters
      </Button>
      <div id="intensityChart" style={{ marginTop: "40px" }}></div>
      <div id="likelihoodChart" style={{ marginTop: "40px" }}></div>
      <div id="relevanceChart" style={{ marginTop: "40px" }}></div>
      <div id="yearChart" style={{ marginTop: "40px" }}></div>
      <div id="countryChart" style={{ marginTop: "40px" }}></div>
      <div id="topicChart" style={{ marginTop: "40px" }}></div>
      <div id="regionChart" style={{ marginTop: "40px" }}></div>
      <div id="cityChart" style={{ marginTop: "40px" }}></div>
    </Box>
  );
};

export default Dashboard;
