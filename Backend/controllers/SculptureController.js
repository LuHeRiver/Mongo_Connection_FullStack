import SculptureModel from "../models/SculptureModel.js";

//GET

export const getAllSculptures = async (request, response) =>{

    try{
        const sculptures = await SculptureModel.find();
        response.status(200).json(sculptures); // Es 200 porque si la petición get sale bien es 200.
    }
    
    catch(error){
        response.status(500).json({message: error.message});
    }
}


// POST

export const createSculpture = async (req, res) => {
    try {
    
    // Crear una nueva escultura utilizando el método create del modelo SculptureModel
    const newSculpture = await SculptureModel.create(req.body);

    // Enviar la respuesta con estado 201 y la nueva escultura creada en formato JSON
    res.status(201).json(newSculpture);
    } catch (error) {
    // Manejar los errores y enviar una respuesta con estado 500 junto con el mensaje de error
    console.error(error);
    res.status(500).json({ message: error.message });
    }
   };

   

// PUT

   export const updateSculpture = async (req, res) => {
    
    const idSculpture = req.params.id;
    try {
    const editedSculpture = await SculptureModel.findByIdAndUpdate(idSculpture, req.body)
        res.status(200).json({ message: `Sculpture with ID ${idSculpture} Escultura Actualizada Correctamente: `, sculpture: editedSculpture })
    } catch (error) {
    // Manejar los errores y enviar una respuesta con estado 500 junto con el mensaje de error
    console.error(error);
    res.status(500).json({ message: error.message });
    }
   };


//DELETE

export const deleteSculpture = async (req, res) => {
    const sculptureId = req.params.id;
    try {
        const result = await SculptureModel.deleteOne( {_id: sculptureId} );
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Escultura no encontrada' });
        }
        return res.status(200).json({ message: 'Escultura eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la escultura:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};