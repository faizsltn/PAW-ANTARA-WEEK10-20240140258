const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Menyesuaikan instance koneksi DB kamu

const ChatHistory = sequelize.define('ChatHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'model', 'assistant'),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  saveHistory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'chat_histories',
  timestamps: true,
});

module.exports = ChatHistory;