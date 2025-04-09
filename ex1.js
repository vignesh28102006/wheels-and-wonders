// Vehicle comparison array and limit
const comparedVehicles = [];
const maxComparisonLimit = 3;

// Update showVehicleDetails function
function showVehicleDetails(vehicleId) {
    document.querySelectorAll('.vehicle-details-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    const modal = document.getElementById(vehicleId + '-details');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('no-scrollbar');
        // Add this line to prevent background scrolling
        document.documentElement.style.overflow = 'hidden';
    }
}

// Update closeDetails function
function closeDetails(vehicleId) {
    const modal = document.getElementById(vehicleId + '-details');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scrollbar');
        // Add this line to restore scrolling
        document.documentElement.style.overflow = '';
    }
}

// Add vehicle to comparison
function addToCompare(vehicleId, event) {
    if (event) event.stopPropagation();
    
    if (!comparedVehicles.includes(vehicleId)) {
        if (comparedVehicles.length < maxComparisonLimit) {
            comparedVehicles.push(vehicleId);
            updateComparisonResults();
            showToast(`${getVehicleName(vehicleId)} added to comparison`);
        } else {
            showToast(`Maximum ${maxComparisonLimit} vehicles can be compared at once.`);
        }
    } else {
        showToast("This vehicle is already in comparison");
    }
}

// Update comparison results in modal
function updateComparisonResults() {
    const resultsDiv = document.getElementById("comparison-results");
    if (!resultsDiv) return;

    if (comparedVehicles.length === 0) {
        resultsDiv.innerHTML = "<p>No vehicles selected for comparison</p>";
        return;
    }

    let html = `
        <div class="comparison-header">
            <h3>Vehicle Comparison</h3>
            <div class="comparison-actions">
                <button onclick="clearComparison()">Clear All</button>
                <button onclick="printComparison()">Print</button>
            </div>
        </div>
        <table class="comparison-table">
            <tr><th>Specification</th>
    `;

    comparedVehicles.forEach(vehicleId => {
        html += `<th>${getVehicleName(vehicleId)}</th>`;
    });
    html += `</tr>`;

    // Specification categories
    const specCategories = {
        "Basic": ["make", "year", "price", "color"],
        "Performance": ["engine", "power", "torque", "transmission", "drive"],
        "Dimensions": ["length", "width", "height", "weight", "seating"],
        "Fuel": ["fuel", "capacity", "mileage"],
        "Features": ["safety", "infotainment"]
    };

    // Add rows for each category
    for (const [category, specs] of Object.entries(specCategories)) {
        html += `<tr class="category-row"><td colspan="${comparedVehicles.length + 1}">${category}</td></tr>`;
        
        specs.forEach(spec => {
            html += `<tr><td>${formatSpecName(spec)}</td>`;
            comparedVehicles.forEach(vehicleId => {
                html += `<td>${getVehicleSpec(vehicleId, spec) || '-'}</td>`;
            });
            html += `</tr>`;
        });
    }

    html += `</table>`;
    resultsDiv.innerHTML = html;
    
    // Show comparison modal
    document.getElementById("comparison-modal").style.display = "block";
}

// Helper function to get vehicle name
function getVehicleName(vehicleId) {
    const vehicleNames = {
        "car1": "BMW 7 Series",
        "car2": "Audi Q7",
        "car3": "Mercedes-Benz S-Class",
        "car4": "Porsche 911",
        "car5": "Lexus RX 500h",
        "car6": "Jaguar F-Pace",
        "car7": "Range Rover Velar",
        "car8": "Tesla Model S",
        "car9": "Maserati Ghibli",
        "car10": "Bentley Continental GT",
        "bike1": "Harley-Davidson Road King",
        "bike2": "Kawasaki Ninja H2",
        "bike3": "Ducati Panigale V4",
        "bike4": "BMW R 1250 GS",
        "bike5": "Royal Enfield Interceptor 650",
        "bike6": "Triumph Bonneville T120",
        "bike7": "Suzuki Hayabusa"
    };
    return vehicleNames[vehicleId] || "Unknown Vehicle";
}

// Helper function to get vehicle specifications
function getVehicleSpec(vehicleId, spec) {
    const vehicleSpecs = {
        // BMW 7 Series
            "car1": { // BMW 7 Series
            "make": "BMW",
            "model": "740i",
            "year": "2023",
            "price": "$90,000",
            "colors": ["Black Sapphire", "Mineral White", "Carbon Black"],
            "engine": {
                "type": "3.0L I6 Turbo",
                "displacement": "2998 cc",
                "power": "335 hp @ 5500 rpm",
                "torque": "450 Nm @ 1500 rpm",
                "aspiration": "TwinPower Turbo"
            },
            "transmission": "8-Speed Steptronic Automatic",
            "drivetrain": "Rear-Wheel Drive",
            "dimensions": {
                "length": "5120 mm",
                "width": "1902 mm",
                "height": "1467 mm",
                "wheelbase": "3070 mm",
                "ground_clearance": "140 mm",
                "weight": "1860 kg"
            },
            "capacity": {
                "seating": "5",
                "fuel_tank": "78 L",
                "cargo": "515 L"
            },
            "performance": {
                "0-100": "5.1 sec",
                "top_speed": "250 km/h (limited)",
                "mileage": {
                    "city": "10.5 kmpl",
                    "highway": "14.2 kmpl"
                }
            },
            "brakes": {
                "front": "Ventilated Disc (348 mm)",
                "rear": "Ventilated Disc (345 mm)"
            },
            "suspension": {
                "front": "Double Wishbone Air Suspension",
                "rear": "Multi-Link Air Suspension"
            },
            "wheels": {
                "front": "245/45 R19",
                "rear": "275/40 R19"
            },
            "features": {
                "safety": ["8 Airbags", "ABS", "ESP", "Lane Departure Warning", "Parking Assistant"],
                "infotainment": ["12.3\" Touchscreen", "Harman Kardon Audio", "Wireless CarPlay", "Gesture Control"],
                "comfort": ["4-Zone Climate", "Soft-Close Doors", "Panoramic Sunroof", "Massage Seats"]
            }
        },
    
        "car2": { // Audi Q7
            "make": "Audi",
            "model": "55 TFSI Quattro",
            "year": "2023",
            "price": "$60,000",
            "colors": ["Glacier White", "Daytona Gray", "Navarra Blue"],
            "engine": {
                "type": "3.0L V6 Turbo",
                "displacement": "2995 cc",
                "power": "335 hp @ 5300 rpm",
                "torque": "500 Nm @ 1370 rpm",
                "aspiration": "Turbocharged"
            },
            "transmission": "8-Speed Tiptronic",
            "drivetrain": "Quattro AWD",
            "dimensions": {
                "length": "5063 mm",
                "width": "1970 mm",
                "height": "1741 mm",
                "wheelbase": "2994 mm",
                "ground_clearance": "185 mm (adjustable)",
                "weight": "2115 kg"
            },
            "capacity": {
                "seating": "7",
                "fuel_tank": "85 L",
                "cargo": "865 L (seats folded)"
            },
            "performance": {
                "0-100": "5.9 sec",
                "top_speed": "250 km/h (limited)",
                "mileage": {
                    "city": "9.8 kmpl",
                    "highway": "13.6 kmpl"
                }
            },
            "brakes": {
                "front": "Ventilated Disc (400 mm)",
                "rear": "Ventilated Disc (370 mm)"
            },
            "suspension": {
                "front": "Multi-Link Air Suspension",
                "rear": "Multi-Link Air Suspension"
            },
            "wheels": {
                "front": "255/55 R19",
                "rear": "255/55 R19"
            },
            "features": {
                "safety": ["6 Airbags", "ABS", "ESC", "Quattro AWD", "Night Vision Assistant"],
                "infotainment": ["10.1\" MMI Touch", "Bang & Olufsen 3D Audio", "Virtual Cockpit"],
                "comfort": ["4-Zone Climate", "Panoramic Sunroof", "Valcona Leather"]
            }
        },
        "car3": { // Mercedes-Benz S-Class
        "make": "Mercedes-Benz",
        "model": "S 500",
        "year": "2023",
        "price": "$110,000",
        "colors": ["Onyx Black", "Iridium Silver", "Selenite Grey"],
        "engine": {
            "type": "3.0L I6 Turbo Hybrid",
            "displacement": "2999 cc",
            "power": "435 hp @ 6100 rpm",
            "torque": "520 Nm @ 1800 rpm",
            "aspiration": "EQ Boost"
        },
        "transmission": "9G-Tronic Automatic",
        "drivetrain": "4MATIC AWD",
        "dimensions": {
            "length": "5179 mm",
            "width": "1921 mm",
            "height": "1503 mm",
            "wheelbase": "3106 mm",
            "ground_clearance": "148 mm (adjustable)",
            "weight": "2095 kg"
        },
        "capacity": {
            "seating": "5",
            "fuel_tank": "76 L",
            "cargo": "550 L"
        },
        "performance": {
            "0-100": "4.9 sec",
            "top_speed": "250 km/h (limited)",
            "mileage": {
                "city": "12.3 kmpl",
                "highway": "16.5 kmpl"
            }
        },
        "features": {
            "safety": ["9 Airbags", "PRE-SAFE", "Night Vision", "Driving Assistance Plus"],
            "infotainment": ["12.8\" OLED Display", "Burmester 4D Sound", "MBUX Interior Assist"],
            "luxury": ["Energizing Comfort Control", "Rear Executive Seats", "Thermotronic Climate"]
        }
    },

    "car4": { // Porsche 911
        "make": "Porsche",
        "model": "911 Carrera S",
        "year": "2023",
        "price": "$120,000",
        "colors": ["Guards Red", "Carrara White", "Jet Black Metallic"],
        "engine": {
            "type": "3.0L Twin-Turbo Flat-6",
            "displacement": "2981 cc",
            "power": "443 hp @ 6500 rpm",
            "torque": "530 Nm @ 2300 rpm"
        },
        "transmission": "8-Speed PDK",
        "drivetrain": "Rear-Wheel Drive",
        "dimensions": {
            "length": "4519 mm",
            "width": "1852 mm",
            "height": "1300 mm",
            "wheelbase": "2450 mm",
            "weight": "1505 kg"
        },
        "performance": {
            "0-100": "3.5 sec (with Sport Chrono)",
            "top_speed": "308 km/h",
            "mileage": {
                "city": "9.2 kmpl",
                "highway": "12.4 kmpl"
            }
        },
        "features": {
            "safety": ["Porsche Stability Management", "Wet Mode", "Night Vision Assist"],
            "performance": ["Porsche Active Suspension", "Porsche Torque Vectoring"],
            "technology": ["10.9\" PCM System", "Bose Surround Sound"]
        }
    },

    "car5": { // Lexus RX 500h
        "make": "Lexus",
        "model": "RX 500h F Sport",
        "year": "2023",
        "price": "$65,000",
        "colors": ["Sonic Chrome", "Matte Black", "Deep Green Mica"],
        "engine": {
            "type": "2.4L Turbo Hybrid",
            "power": "366 hp",
            "torque": "460 Nm",
            "electric_motor": "182 hp"
        },
        "transmission": "6-Speed Automatic",
        "drivetrain": "E-Four AWD",
        "dimensions": {
            "length": "4890 mm",
            "width": "1920 mm",
            "height": "1695 mm"
        },
        "features": {
            "safety": ["Lexus Safety System+ 2.5", "10 Airbags"],
            "technology": ["14\" Touchscreen", "Mark Levinson Audio"],
            "luxury": ["Semi-Aniline Leather", "Climate Concierge"]
        }
    },

    "car6": { // Jaguar F-Pace
        "make": "Jaguar",
        "model": "F-Pace SVR",
        "year": "2023",
        "price": "$55,000",
        "colors": ["Firenze Red", "Santorini Black", "Eiger Grey"],
        "engine": {
            "type": "5.0L Supercharged V8",
            "power": "542 hp",
            "torque": "680 Nm"
        },
        "performance": {
            "0-100": "4.0 sec",
            "top_speed": "286 km/h"
        },
        "features": {
            "performance": ["Configurable Dynamics", "Active Rear Spoiler"],
            "luxury": ["Windsor Leather", "Suedecloth Headliner"]
        }
    },

    "car7": { // Range Rover Velar
        "make": "Land Rover",
        "model": "Velar SVAutobiography",
        "year": "2023",
        "price": "$60,000",
        "colors": ["Carpathian Grey", "Lantau Bronze", "Byron Blue"],
        "engine": {
            "type": "5.0L Supercharged V8",
            "power": "542 hp",
            "torque": "680 Nm"
        },
        "features": {
            "technology": ["Touch Pro Duo", "ClearSight Ground View"],
            "offroad": ["Terrain Response 2", "All-Terrain Progress Control"]
        }
    },

    "car8": { // Tesla Model S
        "make": "Tesla",
        "model": "Model S Plaid",
        "year": "2023",
        "price": "$90,000",
        "colors": ["Solid Black", "Pearl White", "Ultra Red"],
        "battery": {
            "capacity": "100 kWh",
            "range": "637 km (EPA)"
        },
        "performance": {
            "0-100": "2.1 sec",
            "top_speed": "322 km/h"
        },
        "features": {
            "technology": ["17\" Touchscreen", "Gaming Computer", "Plaid Powertrain"],
            "safety": ["Autopilot", "8 Cameras", "Ultrasonic Sensors"]
        }
    },

    "car9": { // Maserati Ghibli
        "make": "Maserati",
        "model": "Ghibli Trofeo",
        "year": "2023",
        "price": "$78,000",
        "colors": ["Blu Emozione", "Grigio Lava", "Rosso Magma"],
        "engine": {
            "type": "3.0L Twin-Turbo V6",
            "power": "572 hp",
            "torque": "730 Nm"
        },
        "performance": {
            "0-100": "4.3 sec",
            "top_speed": "326 km/h"
        },
        "features": {
            "sound": ["Active Sound System", "Dual-Mode Exhaust"],
            "interior": ["Pieno Fiore Leather", "Aluminum Pedals"]
        }
    },

    "car10": { // Bentley Continental GT
        "make": "Bentley",
        "model": "Continental GT Speed",
        "year": "2023",
        "price": "$220,000",
        "colors": ["Onyx", "Dragon Red II", "Silver Tempest"],
        "engine": {
            "type": "6.0L Twin-Turbo W12",
            "power": "650 hp",
            "torque": "900 Nm"
        },
        "performance": {
            "0-100": "3.6 sec",
            "top_speed": "335 km/h"
        },
        "features": {
            "luxury": ["Mulliner Driving Specification", "Rotating Display"],
            "technology": ["Night Vision", "Traffic Assist"]
        }
    },

    // ====== BIKES ======
    "bike1": { // Harley-Davidson Road King
        "make": "Harley-Davidson",
        "model": "Road King Special",
        "year": "2023",
        "price": "$20,000",
        "colors": ["Vivid Black", "River Rock Gray", "Billiard Red"],
        "engine": {
            "type": "Milwaukee-Eight 114 V-Twin",
            "displacement": "1745 cc",
            "power": "85 hp @ 5020 rpm",
            "torque": "155 Nm @ 3000 rpm",
            "cooling": "Air/Oil Cooled"
        },
        "transmission": "6-Speed CruiseDrive",
        "drivetrain": "Chain",
        "dimensions": {
            "length": "2440 mm",
            "width": "980 mm",
            "height": "1420 mm",
            "wheelbase": "1625 mm",
            "seat_height": "720 mm",
            "weight": "365 kg"
        },
        "capacity": {
            "seating": "2",
            "fuel_tank": "22.7 L"
        },
        "performance": {
            "top_speed": "180 km/h",
            "mileage": {
                "city": "15 kmpl",
                "highway": "20 kmpl"
            }
        },
        "brakes": {
            "front": "Dual 300mm Disc (4-piston)",
            "rear": "292mm Disc (2-piston)"
        },
        "suspension": {
            "front": "49mm Telescopic Fork",
            "rear": "Emulsion Shocks"
        },
        "wheels": {
            "front": "130/80 B17",
            "rear": "180/65 B16"
        },
        "features": {
            "safety": ["ABS", "Traction Control", "Security System"],
            "infotainment": ["Boom! Box GTS", "Bluetooth", "Navigation"],
            "comfort": ["Cruise Control", "Hard Saddlebags", "LED Lighting"]
        }
    },

    "bike2": { // Kawasaki Ninja H2
        "make": "Kawasaki",
        "model": "Ninja H2",
        "year": "2023",
        "price": "$30,000",
        "colors": ["Metallic Matte Black", "Metallic Matte Dark Green"],
        "engine": {
            "type": "Supercharged Inline-4",
            "displacement": "998 cc",
            "power": "228 hp @ 11500 rpm",
            "torque": "141 Nm @ 11000 rpm",
            "cooling": "Liquid"
        },
        "transmission": "6-Speed Quick Shifter",
        "drivetrain": "Chain",
        "dimensions": {
            "length": "2085 mm",
            "width": "770 mm",
            "height": "1125 mm",
            "wheelbase": "1455 mm",
            "seat_height": "825 mm",
            "weight": "238 kg"
        },
        "capacity": {
            "seating": "2",
            "fuel_tank": "17 L"
        },
        "performance": {
            "top_speed": "340 km/h (limited)",
            "mileage": {
                "city": "12 kmpl",
                "highway": "16 kmpl"
            }
        },
        "brakes": {
            "front": "Dual 330mm Disc (Brembo)",
            "rear": "250mm Disc"
        },
        "suspension": {
            "front": "43mm Inverted Fork",
            "rear": "Uni-Trak"
        },
        "wheels": {
            "front": "120/70 ZR17",
            "rear": "200/55 ZR17"
        },
        "features": {
            "safety": ["KIBS ABS", "Launch Control", "Quick Shifter"],
            "infotainment": ["TFT Display", "Rideology App"],
            "comfort": ["Adjustable Footpegs", "Aerodynamic Winglets"]
        }
    },

        "bike3": { // Ducati Panigale V4
        "make": "Ducati",
        "model": "Panigale V4 S",
        "year": "2023",
        "price": "$28,000",
        "colors": ["Ducati Red", "Dark Stealth"],
        "engine": {
            "type": "1103cc Desmosedici Stradale V4",
            "power": "214 hp @ 13000 rpm",
            "torque": "124 Nm @ 9500 rpm"
        },
        "features": {
            "electronics": ["6-Axis IMU", "Cornering ABS EVO"],
            "performance": ["Öhlins Smart EC 2.0", "Quick Shift Up/Down"]
        }
    },

    "bike4": { // BMW R 1250 GS
        "make": "BMW",
        "model": "R 1250 GS Adventure",
        "year": "2023",
        "price": "$18,000",
        "colors": ["Rallye", "Triple Black"],
        "engine": {
            "type": "1254cc Boxer Twin",
            "power": "136 hp",
            "torque": "143 Nm"
        },
        "features": {
            "technology": ["Dynamic ESA", "Hill Start Control"],
            "comfort": ["Active Cruise Control", "Keyless Ride"]
        }
    },

    "bike5": { // Royal Enfield Interceptor 650
        "make": "Royal Enfield",
        "model": "Interceptor 650",
        "year": "2023",
        "price": "$6,000",
        "colors": ["Orange Crush", "Baker Express"],
        "engine": {
            "type": "648cc Parallel Twin",
            "power": "47 hp",
            "torque": "52 Nm"
        },
        "features": {
            "heritage": ["Classic Design", "Chrome Accents"],
            "modern": ["Fuel Injection", "ABS"]
        }
    },

    "bike6": { // Triumph Bonneville T120
        "make": "Triumph",
        "model": "Bonneville T120 Black",
        "year": "2023",
        "price": "$13,000",
        "colors": ["Jet Black", "Cranberry Red"],
        "engine": {
            "type": "1200cc Parallel Twin",
            "power": "79 hp",
            "torque": "105 Nm"
        },
        "features": {
            "classic": ["Wire Spoke Wheels", "Twin Peashooter Exhaust"],
            "modern": ["Ride-by-Wire", "Torque-Assist Clutch"]
        }
    },

    "bike7": { // Suzuki Hayabusa
        "make": "Suzuki",
        "model": "Hayabusa",
        "year": "2023",
        "price": "$16,000",
        "colors": ["Pearl Brilliant White", "Metallic Matte Black"],
        "engine": {
            "type": "1340cc Inline-4",
            "power": "187 hp",
            "torque": "150 Nm"
        },
        "features": {
            "aerodynamics": ["Wind Tunnel Developed", "S-DMS Ride Modes"],
            "braking": ["Brembo Stylema", "Cornering ABS"]
        }
    }
        // Include specs for all other vehicles in the same format
        // ...
    };

    // Navigate through nested specs if needed
    const specPath = spec.split('.');
    let value = vehicleSpecs[vehicleId];
    
    for (const key of specPath) {
        value = value ? value[key] : undefined;
        if (value === undefined) break;
    }
    
    return value || '-';
}

// Format specification names for display
function formatSpecName(spec) {
    const specNames = {
        "make": "Make",
        "year": "Year",
        "price": "Price",
        "color": "Colors",
        "engine": "Engine",
        "power": "Power",
        "torque": "Torque",
        "transmission": "Transmission",
        "drive": "Drivetrain",
        "length": "Length",
        "width": "Width",
        "height": "Height",
        "weight": "Weight",
        "seating": "Seating",
        "fuel": "Fuel Type",
        "capacity": "Fuel Capacity",
        "mileage": "Mileage",
        "safety": "Safety Features",
        "infotainment": "Infotainment"
    };
    return specNames[spec] || spec.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }, 100);
}

// Print comparison
function printComparison() {
    window.print();
}

// Clear comparison
function clearComparison() {
    comparedVehicles.length = 0;
    closeComparisonModal();
    showToast("Comparison cleared");
}

// Close comparison modal
function closeComparisonModal() {
    document.getElementById("comparison-modal").style.display = "none";
}

// Schedule test drive (placeholder function)
function scheduleTestDrive(vehicleId) {
    const vehicleName = getVehicleName(vehicleId);
    showToast(`Test drive scheduled for ${vehicleName}! We'll contact you shortly.`);
    closeDetails(vehicleId);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'vehicle-details-modal') {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target.className === 'modal') {
        closeComparisonModal();
    }
}

// Initialize modals on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Create comparison modal if it doesn't exist
    if (!document.getElementById("comparison-modal")) {
        const modalHTML = `
            <div id="comparison-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeComparisonModal()">&times;</span>
                    <div id="comparison-results"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
});
