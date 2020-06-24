
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

    // Get the Address values
    var address1 = document.getElementById('address1').value;
    var address2 = document.getElementById('address2').value;
    var address3 = document.getElementById('address3').value;
    var address4 = document.getElementById('address4').value;

    var addressString = `${address1}.${address2}.${address3}.${address4}`;
    var completeAddressAvailable = (address1 != '' && address2 != '' && address3 != '' && address4 != '') ? true : false;

    // Get the subnet values
    var subnet1 = document.getElementById('subnet1').value;
    var subnet2 = document.getElementById('subnet2').value;
    var subnet3 = document.getElementById('subnet3').value;
    var subnet4 = document.getElementById('subnet4').value;
    var subnetNotation = document.getElementById('subnetNotation').value;

    var completeSubnetAvailable = (subnet1 != '' && subnet2 != '' && subnet3 != '' && subnet4 != '') ? true : false;
    
    var subnetString;
    var subnetBinary;
    if(completeSubnetAvailable) {
        subnetType = 'decimal';
        subnetString = `${subnet1}.${subnet2}.${subnet3}.${subnet4}`;
        subnetBinary = convertFromDecimalStringToBinary(subnetString);

    } else {
        if (subnetNotation != '') {
            subnetType = 'notation';
            completeSubnetAvailable = true;
            subnetBinary = convertFromNotationToBinary(subnetNotation);
            subnetString = convertFromBinaryToDecimalString(subnetBinary);
        }
    }





    if(form.reportValidity()) {
        var results = document.getElementById('results-display');
        results.innerHTML = '';

        // IP Address
        var ipDispalyTitle = document.createElement('h3');
        ipDispalyTitle.innerHTML = "IP Address:";
        var ipDispaly = document.createElement('p');
        ipDispaly.innerHTML = (completeAddressAvailable) ? addressString : "No Address Provided";

        // Sybnet in decimal
        var subnetDisplayTitle = document.createElement('h3');
        subnetDisplayTitle.innerHTML = "Subnet Mask:";
        var subnetDisplay = document.createElement('p');
        subnetDisplay.innerHTML = (completeSubnetAvailable) ? subnetString : "No Subnet Provided";

        // Subnet in binary
        var binarySubnetDisplayTitle = document.createElement('h3');
        binarySubnetDisplayTitle.innerHTML = "Binary Subnet Mask:";
        var binarySubnetDisplay = document.createElement('p');
        binarySubnetDisplay.innerHTML = (completeSubnetAvailable) ? styleBinary(subnetBinary) : "No Subnet Provided";



        // Subnet Calculations
        console.log("All Bits: " + subnetBinary);
        var numAddressBits = 0;

        // Calculate the number of address bits in the given subnet mask
        var index = 0;
        while (true) {
            if (subnetBinary[index] == 1) 
                numAddressBits++;
            else 
                break;
            
            index++;
        }

        // Calculate number of hosts from number of network bits
        console.log("Bits Number: " + numAddressBits);
        var numHostBits = (32 - numAddressBits);
        var numHosts = (completeSubnetAvailable) ? Math.pow(2, numHostBits) : "NA";



        // Number of available hosts
        var numHostsDisplayTitle = document.createElement('h3');
        numHostsDisplayTitle.innerHTML = "Number of Hosts (-2):";
        var numHostsDisplay = document.createElement('p');
        numHostsDisplay.innerHTML = (numHosts - 2);


        // Update input values with matching information
        if (subnetType == 'notation') {
            var decimalSubnet = subnetString.split('.');

            document.getElementById('subnet1').value = decimalSubnet[0];
            document.getElementById('subnet2').value = decimalSubnet[1];
            document.getElementById('subnet3').value = decimalSubnet[2];
            document.getElementById('subnet4').value = decimalSubnet[3];
        } else {
            document.getElementById('subnetNotation').value = numAddressBits;
        }


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









function convertFromDecimalStringToBinary(decimalSubnet) {
    var decimalArray = decimalSubnet.split('.');
    console.log('Decimal Array: ' + decimalArray);

    var octet1 = Number(decimalArray[0]).toString(2);
    var octet2 = Number(decimalArray[1]).toString(2);
    var octet3 = Number(decimalArray[2]).toString(2);
    var octet4 = Number(decimalArray[3]).toString(2);

    // Adding back leading zeros
    while (octet1.length < 8) {
        octet1 = '0' + octet1;
    }
    while (octet2.length < 8) {
        octet2 = '0' + octet2;
    }
    while (octet3.length < 8) {
        octet3 = '0' + octet3;
    }
    while (octet4.length < 8) {
        octet4 = '0' + octet4;
    }

    return (octet1 + octet2 + octet3 + octet4);
}

function convertFromBinaryToDecimalString(binary) {
    var octet1 = Number(binary.substring(0, 8));
    var octet2 = Number(binary.substring(8, 16));
    var octet3 = Number(binary.substring(16, 24));
    var octet4 = Number(binary.substring(24, 32));

    return `${parseInt(octet1, 2)}.${parseInt(octet2, 2)}.${parseInt(octet3, 2)}.${parseInt(octet4, 2)}`;
}

function convertFromNotationToBinary(notation) {
    var octet1 = '';
    var octet2 = '';
    var octet3 = '';
    var octet4 = '';

    while (true) {
        if (octet1.length < 8)
            if (notation > 0) {
                notation--;
                octet1 += '1';
            } else {
                octet1 += '0';
            }
        else if (octet2.length < 8)
            if (notation > 0) {
                notation--;
                octet2 += '1';
            } else {
                octet2 += '0';
            }
        else if (octet3.length < 8)
            if (notation > 0) {
                notation--;
                octet3 += '1';
            } else {
                octet3 += '0';
            }
        else if (octet4.length < 8)
            if (notation > 0) {
                notation--;
                octet4 += '1';
            } else {
                octet4 += '0';
            }
        else
            break;
    }

    return (octet1 + octet2 + octet3 + octet4);
}

function styleBinary(binary) {
    var octet1 = binary.substring(0, 8);
    var octet2 = binary.substring(8, 16);
    var octet3 = binary.substring(16, 24);
    var octet4 = binary.substring(24, 32);

    var part1 = octet1.substring(0, 4) + ' ' + octet1.substring(4, 8);
    var part2 = octet2.substring(0, 4) + ' ' + octet2.substring(4, 8);
    var part3 = octet3.substring(0, 4) + ' ' + octet3.substring(4, 8);
    var part4 = octet4.substring(0, 4) + ' ' + octet4.substring(4, 8);

    return part1 + ' . ' + part2 + ' . ' + part3 + ' . ' + part4;
}