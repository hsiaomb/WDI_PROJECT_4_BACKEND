var Channel   = require('../models/channel');

function channelsIndex(req, res) {
  Channel.find(function(err, channels){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ channels: channels });
  });
}

function createChannel(req, res) {
  var channel = new Channel(req.body);

  channel.save(function(error) {
    if(error) return res.status(500).send(error);

    res.status(201).send(channel);
  });
}

function channelsShow(req, res){
  Channel.findById(req.params.id, function(err, channel){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ channel: channel });
  });
}

function channelsUpdate(req, res){
  Channel.findById(req.params.id,  function(err, channel) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!channel) return res.status(404).json({message: 'No channel found.'});

    if (req.body.name) channel.name = req.body.name;
    if (req.body.description) channel.description = req.body.description;
    if (req.body.secret) channel.secret = req.body.secret;
    if (req.body.current_video) channel.current_video = req.body.current_video;
    if (req.body.playlist) channel.playlist = req.body.playlist;

    channel.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', channel: channel});
    });
  });
}

function channelsDelete(req, res){
  Channel.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Channel has been successfully deleted'});
  });
}

module.exports = {
  channelsIndex : channelsIndex,
  createChannel : createChannel,
  channelsShow  : channelsShow,
  channelsUpdate: channelsUpdate,
  channelsDelete: channelsDelete
};
