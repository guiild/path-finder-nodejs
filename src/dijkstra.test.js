const Dijkstra = require("./dijkstra");

describe("dijkstra", () => {
  it("initialize correctly", () => {
    const dijkstra = new Dijkstra(20, 8);
    expect(dijkstra.distances).toHaveLength(64);
    expect(dijkstra.distances[19]).toBe(0);
  });
});
