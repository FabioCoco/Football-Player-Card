'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { Player } from '../types/player';
import PlayerCard from '../components/PlayerCard';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<Partial<Player>>({
    name: '',
    position: '',
    overall: 0,
    nationality: '',
    club: '',
    age: 0,
    height: '',
    weight: '',
    description: '',
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/players');
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (player?: Player) => {
    if (player) {
      setEditingPlayer(player);
      setFormData(player);
    } else {
      setEditingPlayer(null);
      setFormData({
        name: '',
        position: '',
        overall: 0,
        nationality: '',
        club: '',
        age: 0,
        height: '',
        weight: '',
        description: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPlayer(null);
    setFormData({
      name: '',
      position: '',
      overall: 0,
      nationality: '',
      club: '',
      age: 0,
      height: '',
      weight: '',
      description: '',
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.position ||
      !formData.overall ||
      !formData.nationality ||
      !formData.club
    ) {
      alert('Harap isi semua field yang wajib');
      return;
    }

    try {
      if (editingPlayer) {
        const response = await fetch(`/api/players/${editingPlayer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchPlayers();
          handleCloseModal();
        }
      } else {
        const response = await fetch('/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchPlayers();
          handleCloseModal();
        }
      }
    } catch (error) {
      console.error('Failed to save player:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleDeletePlayer = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pemain ini?')) {
      try {
        const response = await fetch(`/api/players/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPlayers();
        }
      } catch (error) {
        console.error('Failed to delete player:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #1a1a2e 75%, #0f0f1e 100%)',
        padding: '2rem 0',
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      
      <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h1
              className="display-4 fw-bold mb-2 text-white"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Koleksi Pemain eFootball
            </h1>
            <p className="text-white-50">Kelola koleksi kartu pemain eFootball Anda</p>
          </div>
          <div className="d-flex gap-2">
            <Link href="/" className="btn btn-outline-light me-2">
              Home
            </Link>
            <Link href="/external-players" className="btn btn-outline-light me-2">
              Mencari Pemain
            </Link>
            <Button
              onClick={() => handleOpenModal()}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              + Tambah Pemain
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {players.map((player) => (
                <Col key={player.id} xs={12} sm={6} md={4} lg={3}>
                  <PlayerCard
                    player={player}
                    onDelete={handleDeletePlayer}
                    onEdit={() => handleOpenModal(player)}
                  />
                </Col>
              ))}
            </Row>

            {players.length === 0 && (
              <Card
                className="text-center py-5 border-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Card.Body>
                  <h5 className="text-muted">Belum ada pemain dalam koleksi</h5>
                  <Button
                    onClick={() => handleOpenModal()}
                    className="mt-3"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                    }}
                  >
                    Tambah Pemain Pertama
                  </Button>
                </Card.Body>
              </Card>
            )}
          </>
        )}

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPlayer ? 'Edit Pemain' : 'Tambah Pemain Baru'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Pemain</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama pemain"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Posisi</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="CF, CMF, CB, dll"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Overall Rating</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="99"
                      value={formData.overall || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, overall: parseInt(e.target.value) || 0 })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Usia</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={formData.age || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kebangsaan</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="Negara"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Klub</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.club}
                      onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                      placeholder="Nama klub"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tinggi</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="180 cm"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Berat</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="75 kg"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi pemain"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              {editingPlayer ? 'Update' : 'Tambah'} Pemain
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
