module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'embersherpa',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
