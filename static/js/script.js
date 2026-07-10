let currentPlotNumber = null;

const plotData = {
    1: {
        title: "Plot 1",
        status: "Assigned",
        gardener: "John Doe",
        notes: "No notes yet."
    },
    2: {
        title: "Plot 2",
        status: "Available",
        gardener: "",
        notes: ""
    },
    3: {
        title: "Plot 3",
        status: "Assigned",
        gardener: "Maria Lopez",
        notes: "Tomatoes and basil"
    },
    4: {
        title: "Plot 4",
        status: "Assigned",
        gardener: "Alex Johnson",
        notes: "Needs watering"
    },
    5: {
        title: "Plot 5",
        status: "Available",
        gardener: "",
        notes: ""
    },
    6: {
        title: "Plot 6",
        status: "Assigned",
        gardener: "Emily Davis",
        notes: "Planting cucumbers"
    },
    7: {
        title: "Plot 7",
        status: "Available",
        gardener: "",
        notes: ""
    },
    8: {
        title: "Plot 8",
        status: "Assigned",
        gardener: "Michael Brown",
        notes: "Harvesting peppers"
    },
    9: {
        title: "Plot 9",
        status: "Available",
        gardener: "",
        notes: ""
    },
    10: {
        title: "Plot 10",
        status: "Assigned",
        gardener: "Sarah Wilson",
        notes: "Planting carrots"
    },
    11: {
        title: "Plot 11",
        status: "Available",
        gardener: "",
        notes: ""
    },
    12: {
        title: "Plot 12",
        status: "Assigned",
        gardener: "David Martinez",
        notes: "Weeding and mulching"
    },
    13: {
        title: "Plot 13",
        status: "Available",
        gardener: "",
        notes: ""
    },
    14: {
        title: "Plot 14",
        status: "Assigned",
        gardener: "Laura Garcia",
        notes: "Planting lettuce"
    },
    15: {
        title: "Plot 15",
        status: "Available",
        gardener: "",
        notes: ""
    },
    16: {
        title: "Plot 16",
        status: "Assigned",
        gardener: "James Anderson",
        notes: "Harvesting zucchini"
    },
    herb_garden: {
        title: "Community Herb Garden",
        status: "Shared Area",
        gardener: "Community",
        notes: "Available for all gardeners."
    },

    berry_plot: {
        title: "Community Berry Plot",
        status: "Shared Area",
        gardener: "Community",
        notes: "Blueberries and raspberries."
    }                                  
};

function openPlotModal(plotNumber) {
    currentPlotNumber = plotNumber;

    const plot = plotData[plotNumber];

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
    const plot = plotData[currentPlotNumber];

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

function savePlotChanges() {
    const status = document.getElementById("status-input").value;
    let gardener = document.getElementById("gardener-input").value;
    const notes = document.getElementById("notes-input").value;

    if (status === "Available") {
        gardener = "";
    }

    plotData[currentPlotNumber] = {
        title: plotData[currentPlotNumber].title,
        status: status,
        gardener: gardener,
        notes: notes
    };

    document.getElementById("modal-status").textContent = status;
    document.getElementById("modal-gardener").textContent = gardener || "—";
    document.getElementById("modal-notes").textContent = notes || "—";

    const currentPlot = document.getElementById("plot" + currentPlotNumber);

    if (currentPlot) {
        const plotFill = currentPlot.querySelector("rect:first-child");

        if (status === "Assigned") {
            plotFill.setAttribute("fill", "#8DBB6B");
        } else {
            plotFill.setAttribute("fill", "#B8D99B");
        }
    }

    document.getElementById("edit-button").style.display = "inline-block";
    document.getElementById("save-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "none";
}

function cancelEditMode() {
    const plot = plotData[currentPlotNumber];

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