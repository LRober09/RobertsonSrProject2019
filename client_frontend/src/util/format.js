const formatUsd = (val) => {
    return '$' + (Math.round(parseFloat(val) * 100) / 100);
};

export {formatUsd}