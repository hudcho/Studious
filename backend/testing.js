const { createCircle, getCircleName, getCircleOwner, deleteCircle} = require('./db_connection/circles-db.js');

(async () => {
    const newCircle = await createCircle('TestCircle', 'testOwner');
    console.log('Created:', newCircle);

    const circleName = await getCircleName(newCircle.id);
    console.log('Circle Name: ', circleName);

    const circleOwner = await getCircleOwner(newCircle.id);
    console.log('Circle owned by: ', circleOwner);

    const deletedCircle = await deleteCircle(newCircle.id);
    console.log('Deleted: ', deleteCircle);
})();