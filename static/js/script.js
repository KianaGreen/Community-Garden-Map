let currentPlotKey = null;
let plotData = {};

async function loadPlotData() {
    try {
        const response = await fetch("/api/plots");

        if (!response.ok) {
            throw new Error("Unable to load plot data.");
        }

        plotData = await response.json();
        updatePlotSummary();
        updatePlotColors();
    } catch (error) {
        console.error("Error loading plot data:", error);
    }
}

loadPlotData();

function openPlotModal(plotNumber) {
    currentPlotKey = plotNumber;

    const plot = plotData[plotNumber];

    if (!plot) {
        console.error("Plot data was not found.");
        return;
    }

    document.getElementById("modal-title").textContent = plot.title;
    document.getElementById("modal-status").textContent = plot.status;
    document.getElementById("modal-gardener").textContent = plot.gardener || "—";
    document.getElementById("modal-notes").textContent = plot.notes || "—";

    if (plot.status === "Shared Area") {
        document.getElementById("edit-button").style.display = "none";
    } else {
        document.getElementById("edit-button").style.display = "inline-block";
    }

    document.getElementById("save-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "none";

    document.getElementById("plot-modal").style.display = "block";
}

function closePlotModal() {
    document.getElementById("plot-modal").style.display = "none";
}

function enableEditMode() {
    const plot = plotData[currentPlotKey];

    document.getElementById("modal-status").innerHTML = `
        <select id="status-input">
            <option value="Assigned" ${plot.status === "Assigned" ? "selected" : ""}>Assigned</option>
            <option value="Available" ${plot.status === "Available" ? "selected" : ""}>Available</option>
        </select>
    `;

    document.getElementById("modal-gardener").innerHTML = `
        <input id="gardener-input" type="text" value="${plot.gardener}">
    `;

    document.getElementById("modal-notes").innerHTML = `
        <textarea id="notes-input">${plot.notes}</textarea>
    `;

    document.getElementById("edit-button").style.display = "none";
    document.getElementById("save-button").style.display = "inline-block";
    document.getElementById("cancel-button").style.display = "inline-block";
}

async function savePlotChanges() {
    const status = document.getElementById("status-input").value;
    let gardener = document.getElementById("gardener-input").value.trim();
    const notes = document.getElementById("notes-input").value.trim();

    if (status === "Available") {
        gardener = "";
    }

    try {
        const response = await fetch(`/api/plots/${currentPlotKey}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status,
                gardener: gardener,
                notes: notes
            })
        });

        if (!response.ok) {
            throw new Error("Unable to save plot changes.");
        }

        const updatedPlot = await response.json();
        plotData[currentPlotKey] = updatedPlot;
        updatePlotSummary();
        updatePlotColors();

        document.getElementById("modal-status").textContent = updatedPlot.status;
        document.getElementById("modal-gardener").textContent =
            updatedPlot.gardener || "—";
        document.getElementById("modal-notes").textContent =
            updatedPlot.notes || "—";

        document.getElementById("edit-button").style.display = "inline-block";
        document.getElementById("save-button").style.display = "none";
        document.getElementById("cancel-button").style.display = "none";
    } catch (error) {
        console.error("Error saving plot changes:", error);
    }
}

function cancelEditMode() {
    const plot = plotData[currentPlotKey];

    document.getElementById("modal-status").textContent = plot.status;
    document.getElementById("modal-gardener").textContent = plot.gardener || "—";
    document.getElementById("modal-notes").textContent = plot.notes || "—";

    if (plot.status === "Shared Area") {
        document.getElementById("edit-button").style.display = "none";
    } else {
        document.getElementById("edit-button").style.display = "inline-block";
    }

    document.getElementById("save-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "none";
}

function updatePlotSummary() {
    let available = 0;
    let assigned = 0;

    for (const key in plotData) {
        if (plotData[key].status === "Available") {
            available++;
        } else if (plotData[key].status === "Assigned") {
            assigned++;
        }
    }

    document.getElementById("plot-summary").textContent =
        `Available: ${available} | Assigned: ${assigned}`;
}

function updatePlotColors() {
    for (const key in plotData) {
        const plot = plotData[key];

        if (plot.status === "Shared Area") {
            continue;
        }

        const plotElement = document.getElementById(`plot${key}`);

        if (!plotElement) {
            console.error(`SVG element plot${key} was not found.`);
            continue;
        }

        const plotFill = plotElement.querySelector("rect:first-child");

        if (!plotFill) {
            console.error(`Fill rectangle for plot${key} was not found.`);
            continue;
        }

        if (plot.status === "Assigned") {
            plotFill.setAttribute("fill", "#8DBB6B");
        } else if (plot.status === "Available") {
            plotFill.setAttribute("fill", "#B8D99B");
        }
    }
}