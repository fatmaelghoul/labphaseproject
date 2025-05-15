module.exports = (source = 'params', key = 'id') => {
    return (req, res, next) => {
      const requestId = req[source]?.[key]; // ex: req.params.id ou req.query.userId
      const clientId = req.clientId; // injecté via JWT dans un middleware d'auth
  
      if (!requestId || !clientId) {
        return res.status(400).json({
          status: false,
          message: 'Identifiants manquants pour la vérification',
        });
      }
  
      if (requestId !== clientId) {
        return res.status(403).json({
          status: false,
          message: 'Accès refusé : IDs ne correspondent pas',
        });
      }
  
      next();
    };
  };
  