'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { Player } from '../types/player';
import { initialPlayers } from '../data/players';
import PlayerCard from '../components/PlayerCard';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
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
    const storedPlayers = localStorage.getItem('efootball_players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    } else {
      setPlayers(initialPlayers);
      localStorage.setItem('efootball_players', JSON.stringify(initialPlayers));
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('efootball_players', JSON.stringify(players));
    }
  }, [players]);

  const handleAddPlayer = () => {
    if (
      newPlayer.name &&
      newPlayer.position &&
      newPlayer.overall &&
      newPlayer.nationality &&
      newPlayer.club
    ) {
      const player: Player = {
        id: Date.now().toString(),
        name: newPlayer.name,
        position: newPlayer.position,
        overall: newPlayer.overall || 0,
        nationality: newPlayer.nationality,
        club: newPlayer.club,
        age: newPlayer.age || 0,
        height: newPlayer.height || '',
        weight: newPlayer.weight || '',
        description: newPlayer.description || '',
      };
      setPlayers([...players, player]);
      setNewPlayer({
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
      setShowModal(false);
    }
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pemain ini?')) {
      const updatedPlayers = players.filter((player) => player.id !== id);
      setPlayers(updatedPlayers);
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
            <Button
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              + Tambah Pemain
            </Button>
          </div>
        </div>

      <Row className="g-4">
        {players.map((player) => (
          <Col key={player.id} xs={12} sm={6} md={4} lg={3}>
            <PlayerCard player={player} onDelete={handleDeletePlayer} />
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
              onClick={() => setShowModal(true)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pemain Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pemain</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    placeholder="Masukkan nama pemain"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Posisi</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPlayer.position}
                    onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
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
                    value={newPlayer.overall || ''}
                    onChange={(e) =>
                      setNewPlayer({ ...newPlayer, overall: parseInt(e.target.value) || 0 })
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
                    value={newPlayer.age || ''}
                    onChange={(e) =>
                      setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) || 0 })
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
                    value={newPlayer.nationality}
                    onChange={(e) => setNewPlayer({ ...newPlayer, nationality: e.target.value })}
                    placeholder="Negara"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Klub</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPlayer.club}
                    onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
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
                    value={newPlayer.height}
                    onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })}
                    placeholder="180 cm"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Berat</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPlayer.weight}
                    onChange={(e) => setNewPlayer({ ...newPlayer, weight: e.target.value })}
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
                value={newPlayer.description}
                onChange={(e) => setNewPlayer({ ...newPlayer, description: e.target.value })}
                placeholder="Deskripsi pemain"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button
            onClick={handleAddPlayer}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            Tambah Pemain
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

