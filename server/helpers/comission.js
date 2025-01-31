const calculateCommission = (totalOmzet) => {
    if (totalOmzet >= 500000000) return 10;
    if (totalOmzet >= 200000000) return 5;
    if (totalOmzet >= 100000000) return 2.5;
    return 0;
  };

//   console.log(calculateCommission(500000000)); // 10
  
  module.exports = { calculateCommission };
