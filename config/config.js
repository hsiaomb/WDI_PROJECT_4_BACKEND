module.exports = {
  'secret': 'watchtogether',
  'database': process.env.MONGOLAB_URI ||'mongodb://localhost/youtube-sync-application'
};
