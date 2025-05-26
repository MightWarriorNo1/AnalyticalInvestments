import { useEffect, useRef } from "react";
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

export default function AllocationChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Stocks", "Bonds", "ETFs", "Crypto", "Cash"],
        datasets: [
          {
            data: [45, 25, 15, 10, 5],
            backgroundColor: [
              "hsl(207, 90%, 54%)", // Primary blue
              "hsl(159, 84%, 39%)", // Secondary green
              "hsl(43, 96%, 56%)",  // Accent amber
              "hsl(262, 83%, 58%)", // Purple
              "hsl(215, 16%, 47%)", // Neutral gray
            ],
            borderWidth: 0,
            hoverBorderWidth: 2,
            hoverBorderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              font: {
                size: 12,
              },
              color: "#374151",
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "hsl(207, 90%, 54%)",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const label = context.label || "";
                const value = context.parsed;
                return `${label}: ${value}%`;
              }
            }
          },
        },
        onHover: (event, activeElements) => {
          if (chartRef.current) {
            chartRef.current.style.cursor = activeElements.length > 0 ? "pointer" : "default";
          }
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} className="w-full h-full" />;
}
