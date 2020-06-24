
function pageLoaded() {
    // const octetInputs = document.getElementsByClassName('address-octet');
    // console.log(octetInputs.toString());

    // var octetInputsLength = octetInputs.length;
    // console.log(octetInputsLength);

    // for(var i = 0; i < octetInputsLength; i++) {
    //     octetInputs[i].addEventListener("keyup", function(event) {
    //         if (event.key === ".") {
    //             octetInputs[i].value = octetInputs[i].value.substring(0, octetInputs[i].value.length - 1);
    //         }
    //     });
    // };
}

function doCalculations() {
    var form = document.getElementById('formm');

    var address1 = document.getElementById('address1').value;
    var address2 = document.getElementById('address2').value;
    var address3 = document.getElementById('address3').value;
    var address4 = document.getElementById('address4').value;
    var addressString = `${address1}.${address2}.${address3}.${address4}`;
    var completeAddressAvailable = (address1 != '' && address2 != '' && address3 != '' && address4 != '') ? true : false;

    var subnet1 = document.getElementById('subnet1').value;
    var subnet2 = document.getElementById('subnet2').value;
    var subnet3 = document.getElementById('subnet3').value;
    var subnet4 = document.getElementById('subnet4').value;
    
    var subnetString = `${subnet1}.${subnet2}.${subnet3}.${subnet4}`;
    var completeSubnetAvailable = (subnet1 != '' && subnet2 != '' && subnet3 != '' && subnet4 != '') ? true : false;
    var subnetBinary = `${convertToBinary(subnet1)}.${convertToBinary(subnet2)}.${convertToBinary(subnet3)}.${convertToBinary(subnet4)}`;

    if(form.reportValidity()) {
        var results = document.getElementById('results-display');
        results.innerHTML = '';

        var ipDispalyTitle = document.createElement('h3');
        ipDispalyTitle.innerHTML = "IP Address:";
        var ipDispaly = document.createElement('p');
        ipDispaly.innerHTML = (completeAddressAvailable) ? addressString : "No Address Provided";

        var subnetDisplayTitle = document.createElement('h3');
        subnetDisplayTitle.innerHTML = "Subnet Mask:";
        var subnetDisplay = document.createElement('p');
        subnetDisplay.innerHTML = (completeSubnetAvailable) ? subnetString : "No Subnet Provided";

        var binarySubnetDisplayTitle = document.createElement('h3');
        binarySubnetDisplayTitle.innerHTML = "Binary Subnet Mask:";
        var binarySubnetDisplay = document.createElement('p');
        binarySubnetDisplay.innerHTML = (completeSubnetAvailable) ? subnetBinary : "No Subnet Provided";



        // Other calculations
        var allNetBits = `${convertToBinary(subnet1)}${convertToBinary(subnet2)}${convertToBinary(subnet3)}${convertToBinary(subnet4)}`;
        console.log("All Bits: " + allNetBits);
        var numAddressBits = 0;
        var numHosts = 0;
        var broken = false;

        for (let i = 0; i < allNetBits.length && broken == false; i++) {
            if (allNetBits[i] == 1) {
                numAddressBits++;

            } else {
                if (allNetBits[i] != ' ')
                    broken = true;
            }
        }

        console.log("Bits Number: " + numAddressBits);
        numHosts = (completeSubnetAvailable) ? Math.pow(2, (32 - numAddressBits)) : "NA";

        

        var numHostsDisplayTitle = document.createElement('h3');
        numHostsDisplayTitle.innerHTML = "Number of Hosts (-2):";
        var numHostsDisplay = document.createElement('p');
        numHostsDisplay.innerHTML = (numHosts - 2);

        // IP Address
        results.appendChild(ipDispalyTitle);
        results.appendChild(ipDispaly);

        results.appendChild(addBreak());

        // Subnet Mask
        results.appendChild(subnetDisplayTitle);
        results.appendChild(subnetDisplay);

        results.appendChild(addBreak());

        // Subnet Binary
        results.appendChild(binarySubnetDisplayTitle);
        results.appendChild(binarySubnetDisplay);

        results.appendChild(addBreak());

        // Number of Hosts
        results.appendChild(numHostsDisplayTitle);
        results.appendChild(numHostsDisplay);

    } else {
        console.log('invalid data');
    }
}

function addBreak() {
    var brk = document.createElement('br');
    return brk;
}

function convertToBinary(number) {
    var binary = Number(number).toString(2);
    var binaryString = binary + '';

    while (binaryString.length < 8) {
        binaryString = '0' + binaryString
    }

    var binaryStringFinal = binaryString.slice(0, 4) + " " + binaryString.slice(4);

    return binaryStringFinal;
}