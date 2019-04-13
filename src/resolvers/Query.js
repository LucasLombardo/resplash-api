const { forwardTo } = require(`prisma-binding`);

const Query = {

    // forward to prisma since no auth needed
    photos: forwardTo(`db`)

};

module.exports = Query;
