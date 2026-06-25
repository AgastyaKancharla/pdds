db = db.getSiblingDB('pdds');
db.detections.createIndex({ detection_id: 1 }, { unique: true });
db.detections.createIndex({ user_id: 1 });
db.detections.createIndex({ createdAt: -1 });
print('PDDS MongoDB ready.');
