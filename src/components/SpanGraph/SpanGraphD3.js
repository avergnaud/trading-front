import * as d3 from "d3";

export class SpanGraphD3 {
  constructor(opts) {
    this.config = opts.config;
    this.margin = this.config.margin;
    this.margin2 = this.config.margin2;
    this.width = this.config.outerWidth - this.margin.left - this.margin.right;
    this.height =
      this.config.outerHeight - this.margin.top - this.margin.bottom;
    this.height2 =
      this.config.outerHeight2 - this.margin2.top - this.margin2.bottom;
    this.legendOffset = this.config.legendOffset;
    this.yMargin = this.config.yMargin;

    /* css module classes */
    let cssClasses = opts.cssClasses;
    this.simuLineClass = cssClasses.simuLine;
    this.simuZoomClass = cssClasses.simuZoom;

    /* interaction avec le composant React : */
    this.dateMin = opts.dateMin;
    this.dateMax = opts.dateMax;
    this.onSpanChange = opts.onSpanChange;
  }

  setElement(element) {
    this.element = element;
  }

  draw(newData) {
    this.element.innerHTML = "";
    this.setupElements();
    this.createScales(newData);
    this.addAxes();

    this.closingPriceLine1 = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d) => this.x(d.date))
      .y((d) => this.y(d.closingPrice));

    this.closingPriceLine2 = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d) => this.x2(d.date))
      .y((d) => this.y2(d.closingPrice));

    this.zoom.on("zoom", () => this.zoomed(newData));

    this.focus
      .append("path")
      .datum(newData)
      .attr("class", this.simuLineClass)
      .attr("d", this.closingPriceLine1);

    this.focus
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);

    this.yAxisG.call(this.yAxisLeft);

    this.context
      .append("path")
      .datum(newData)
      .attr("class", this.simuLineClass)
      .attr("d", this.closingPriceLine2);

    this.context
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height2 + ")")
      .call(this.xAxis2);

    this.context
      .append("g")
      .attr("class", "brush")
      .call(this.brush)
      .call(this.brush.move, this.x.range());

    this.svg
      .append("rect")
      .attr("class", this.simuZoomClass)
      .attr("width", this.width)
      .attr("height", this.height)
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      )
      .call(this.zoom);

    // init avec les dates min et max fournies
    this.updateGraphs([this.x2(this.dateMin), this.x2(this.dateMax)]);
  }

  /**
   * static elements (do not depend on newData)
   */
  setupElements() {
    this.svg = d3
      .select(this.element)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.left + this.margin.right} ${
          this.height + this.margin.top + this.margin.bottom
        }`
      );

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height);

    this.focus = this.svg
      .append("g")
      .attr("class", "focus")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.context = this.svg
      .append("g")
      .attr("class", "context")
      .attr(
        "transform",
        "translate(" + this.margin2.left + "," + this.margin2.top + ")"
      );

    this.identity = d3.zoomIdentity;

    this.brush = d3
      .brushX()
      .extent([
        [0, 0],
        [this.width, this.height2],
      ])
      .on("brush end", this.brushed.bind(this));

    this.zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [this.width, this.height],
      ])
      .extent([
        [0, 0],
        [this.width, this.height],
      ]);
  }

  createScales(data) {
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x2 = d3.scaleTime().range([0, this.width]);
    this.y2 = d3.scaleLinear().range([this.height2, 0]);
    this.x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    let yMin = d3.min(data, (d) => d.closingPrice) - this.yMargin;
    let yMax = d3.max(data, (d) => d.closingPrice) + this.yMargin;
    this.y.domain([yMin, yMax]);
    this.x2.domain(this.x.domain());
    this.y2.domain(this.y.domain());
  }

  addAxes() {
    this.xAxis = d3.axisBottom(this.x);
    this.yAxisLeft = d3.axisLeft(this.y).tickFormat((d) => d + "€");
    this.xAxis2 = d3.axisBottom(this.x2);
    this.yAxisG = this.focus.append("g").attr("class", "axis axis--y");
  }

  /**
   * programmatically update the graphs
   * @param {*} s Array of two elements. Exemple [ 445, 890 ]
   */
  updateGraphs(s) {
    /* set a new x scale domain */
    this.x.domain(s.map(this.x2.invert, this.x2));
    /* update the closingPriceLine1 and axis */
    this.focus
      .select(`.${this.simuLineClass}`)
      .attr("d", this.closingPriceLine1);
    this.focus.select(".axis--x").call(this.xAxis);
    this.svg
      .select(`.${this.simuZoomClass}`)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.scale(this.width / (s[1] - s[0])).translate(-s[0], 0)
      );
  }

  /*
    updates the scale using d3.zoomIdentity, it must do this as it needs to update the 
    zoom function to reflect the current zoom scale and transform.
  */
  brushed() {
    /* check to see if the main body of the function should be executed */
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || this.x2.range();
    this.updateGraphs(s);
  }

  /*
    manually sets the brush, it must do this because the brush needs to be updated.
  */
  zoomed(json) {
    /* check to see if the main body of the function should be executed */
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    /* set a new x scale domain */
    var t = d3.event.transform;
    this.x.domain(t.rescaleX(this.x2).domain());

    /* visibleData */
    const [dateMin, dateMax] = this.x.domain();
    let visibleData = json.slice();
    visibleData.sort((a, b) => a.timeEpochTimestamp - b.timeEpochTimestamp);
    visibleData = visibleData.filter(
      (element, index) => dateMin <= element.date && element.date <= dateMax
    );

    /* updates y scale for the main graph */
    let yMin = d3.min(visibleData, (d) => d.closingPrice) - this.yMargin;
    let yMax = d3.max(visibleData, (d) => d.closingPrice) + this.yMargin;
    this.y.domain([yMin, yMax]);
    this.yAxisG.call(this.yAxisLeft);

    /* update the closingPriceLine1 and axis */
    this.closingPriceLine1.y((d) => this.y(d.closingPrice));
    this.focus
      .select(`.${this.simuLineClass}`)
      .attr("d", this.closingPriceLine1);
    this.focus.select(".axis--x").call(this.xAxis);

    this.context
      .select(".brush")
      .call(this.brush.move, this.x.range().map(t.invertX, t));
    
      this.onSpanChange(this.x.domain())
  }
}
