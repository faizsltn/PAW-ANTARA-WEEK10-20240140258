const { askGemini } = require('../services/gemini.service');
const sendResponse = require('../utils/response');
const ChatHistory = require('../models/chatHistory.model');

/**
 * Controller utama untuk berinteraksi dengan AI dan mengelola riwayat percakapan.
 */

// 1. KIRIM PESAN KE GEMINI & OPTIONAL SIMPAN RIWAYAT (CREATE)
async function chat(req, res) {
  try {
    const { userId, message, saveHistory } = req.body;

    // Kirim prompt ke Gemini AI
    const reply = await askGemini(message);

    // Cek apakah user menyetujui penyimpanan riwayat (saveHistory === true)
    if (saveHistory && userId) {
      // Simpan pesan user
      await ChatHistory.create({
        userId,
        role: 'user',
        message,
        saveHistory,
      });

      // Simpan balasan dari AI
      await ChatHistory.create({
        userId,
        role: 'model', // atau 'assistant' (sesuai Enum di model)
        message: reply,
        saveHistory,
      });
    }

    return sendResponse(res, {
      message: 'Berhasil dapat balasan',
      data: { 
        reply,
        savedToHistory: Boolean(saveHistory && userId)
      },
    });

  } catch (err) {
    console.error('Gemini error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

// 2. AMBIL RIWAYAT PERCAKAPAN BERDASARKAN USER ID (READ)
async function getHistory(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, {
        code: 400,
        success: false,
        message: 'User ID wajib diisi',
      });
    }

    // Cari riwayat percakapan milik user
    const history = await ChatHistory.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
    });

    return sendResponse(res, {
      message: 'Berhasil mengambil riwayat percakapan',
      data: history,
    });

  } catch (err) {
    console.error('Get history error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal mengambil riwayat percakapan',
    });
  }
}

module.exports = { 
  chat,
  getHistory,
};