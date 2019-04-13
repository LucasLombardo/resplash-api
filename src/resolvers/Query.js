const { forwardTo } = require(`prisma-binding`);

const Query = {

    // forward index and show actions to prisma since no auth needed
    photos: forwardTo(`db`),
    photo: forwardTo(`db`)

};

module.exports = Query;
