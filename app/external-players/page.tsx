'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ExternalPlayer {
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strNationality: string;
  strTeam: string;
  dateBorn: string;
  strThumb: string;
  strDescriptionEN: string;
}

export default function ExternalPlayersPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<ExternalPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addingPlayers, setAddingPlayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p='
      );
      const data = await response.json();
      if (data.player) {
        setPlayers(data.player.slice(0, 20));
      } else {
        setPlayers([]);
      }
    } catch (err) {
      console.error('Failed to fetch players from API:', err);
      setError('Failed to fetch players from API');
    } finally {
      setLoading(false);
    }
  };

  const searchPlayers = async () => {
    if (!searchTerm.trim()) {
      fetchPlayers();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.player) {
        setPlayers(data.player);
      } else {
        setPlayers([]);
      }
    } catch (err) {
      console.error('Failed to search players:', err);
      setError('Failed to search players');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateString: string) => {
    if (!dateString) return 0;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const mapPosition = (position: string): string => {
    if (!position) return 'CF';
    const pos = position.toUpperCase();
    if (pos.includes('FORWARD') || pos.includes('STRIKER')) return 'CF';
    if (pos.includes('MIDFIELD')) return 'CMF';
    if (pos.includes('DEFENDER') || pos.includes('DEFENCE')) return 'CB';
    if (pos.includes('GOALKEEPER') || pos.includes('GOALIE')) return 'GK';
    if (pos.includes('WINGER')) return 'RWF';
    return position.substring(0, 3).toUpperCase();
  };

  const estimateOverall = (age: number): number => {
    if (age <= 0) return 75;
    let base = 75;
    if (age >= 25 && age <= 32) base = 85;
    else if (age >= 20 && age < 25) base = 80;
    else if (age > 32) base = 82;
    else base = 75;
    return Math.min(99, base + Math.floor(Math.random() * 10));
  };

  const handleAddToCollection = async (externalPlayer: ExternalPlayer) => {
    const playerId = externalPlayer.idPlayer;
    if (addingPlayers.has(playerId)) return;

    try {
      setAddingPlayers((prev) => new Set(prev).add(playerId));
      
      const age = calculateAge(externalPlayer.dateBorn);
      const position = mapPosition(externalPlayer.strPosition);
      const overall = estimateOverall(age);

      const playerData = {
        name: externalPlayer.strPlayer || 'Unknown Player',
        position: position,
        overall: overall,
        nationality: externalPlayer.strNationality || 'Unknown',
        club: externalPlayer.strTeam || 'Unknown Club',
        age: age,
        height: 'N/A',
        weight: 'N/A',
        description: externalPlayer.strDescriptionEN || 'Player from external API',
      };

      const response = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerData),
      });

      if (response.ok) {
        alert('Pemain berhasil ditambahkan ke koleksi!');
        router.push('/players');
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan pemain: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to add player:', error);
      alert('Gagal menambahkan pemain ke koleksi');
    } finally {
      setAddingPlayers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(playerId);
        return newSet;
      });
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
              External Players API
            </h1>
            <p className="text-white-50">Data dari TheSportsDB API</p>
          </div>
          <Link href="/players" className="btn btn-outline-light">
            Koleksi Saya
          </Link>
        </div>

        <Card
          className="mb-4 border-0"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Card.Body className="p-4">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Cari pemain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchPlayers()}
              />
              <Button
                onClick={searchPlayers}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                }}
              >
                Cari
              </Button>
            </div>
          </Card.Body>
        </Card>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="text-white mt-3">Memuat data...</p>
          </div>
        ) : players.length === 0 ? (
          <Card
            className="text-center py-5 border-0"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Card.Body>
              <h5 className="text-muted">Tidak ada pemain ditemukan</h5>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {players.map((player) => (
              <Col key={player.idPlayer} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="h-100 border-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {player.strThumb && (
                    <Card.Img
                      variant="top"
                      src={player.strThumb}
                      alt={player.strPlayer}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold mb-2">
                      {player.strPlayer}
                    </Card.Title>
                    <div className="mb-2">
                      <small className="text-muted d-block">
                        <strong>Posisi:</strong> {player.strPosition || 'N/A'}
                      </small>
                      <small className="text-muted d-block">
                        <strong>Tim:</strong> {player.strTeam || 'N/A'}
                      </small>
                      <small className="text-muted d-block">
                        <strong>Kebangsaan:</strong> {player.strNationality || 'N/A'}
                      </small>
                      <small className="text-muted d-block">
                        <strong>Usia:</strong> {calculateAge(player.dateBorn)} tahun
                      </small>
                    </div>
                    {player.strDescriptionEN && (
                      <p className="text-muted small mb-3" style={{ fontSize: '0.85rem' }}>
                        {player.strDescriptionEN.substring(0, 100)}...
                      </p>
                    )}
                    <div className="mt-auto pt-3">
                      <Button
                        className="w-100"
                        onClick={() => handleAddToCollection(player)}
                        disabled={addingPlayers.has(player.idPlayer)}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                        }}
                      >
                        {addingPlayers.has(player.idPlayer) ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Menambahkan...
                          </>
                        ) : (
                          '+ Tambah ke Koleksi'
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

