export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const hideAddress = (address, keep) => {
  if(address && address !== "Connect Wallet"){
    let str = address;
    var len = str.length,
      re = new RegExp("(.{" + keep + "})(.{" + (len - keep * 2) + "})(.{" + keep + "})", "g")
    return str.replace(re, function(match, a, b, c) {
      return a + "***" + c
    });
  }else{
    return "Connect Wallet";
  }
  
}


export const Timestamp = (date) => {
  const timestamp = new Date(date);

  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  // format the date and time in a readable way
  //${timestamp.toLocaleDateString(undefined, options)}
  const formattedDateTime = `${formattedTime}`;

  return formattedDateTime;
}

