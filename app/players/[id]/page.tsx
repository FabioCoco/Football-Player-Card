'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { Player } from '../../types/player';

export default function PlayerDetailPage() {
  const params = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPlayer();
    }
  }, [params.id]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/players/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPlayer(data);
      } else if (response.status === 404) {
        setPlayer(null);
      } else {
        console.error('Failed to fetch player:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch player:', error);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  };

  const getPositionColor = (position: string) => {
    if (position.includes('CF') || position.includes('SS')) return 'danger';
    if (position.includes('AMF') || position.includes('CMF')) return 'warning';
    if (position.includes('CB') || position.includes('GK')) return 'info';
    if (position.includes('WB') || position.includes('LB') || position.includes('RB')) return 'success';
    return 'primary';
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #1a1a2e 75%, #0f0f1e 100%)',
          padding: '2rem 0',
        }}
      >
        <div className="text-center text-white">
          <Spinner animation="border" variant="light" />
          <p className="mt-3">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #1a1a2e 75%, #0f0f1e 100%)',
          padding: '2rem 0',
        }}
      >
        <Container className="text-center position-relative" style={{ zIndex: 1 }}>
          <Card
            className="border-0"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Card.Body className="p-5">
              <h3>Pemain tidak ditemukan</h3>
              <Link href="/players">
                <Button
                  className="mt-3"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                  }}
                >
                  Kembali ke Daftar Pemain
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

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
        <Link href="/players">
          <Button
            variant="outline-light"
            className="mb-4"
          >
            ← Kembali ke Daftar Pemain
          </Button>
        </Link>

        <Card
          className="shadow-lg border-0"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            className="position-relative"
            style={{
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="text-center text-white">
              <h1 className="display-1 fw-bold mb-0">{player.overall}</h1>
              <Badge bg={getPositionColor(player.position)} className="mt-3" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
                {player.position}
              </Badge>
            </div>
          </div>

          <Card.Body className="p-5">
            <Row>
              <Col md={8}>
                <h1 className="display-4 fw-bold mb-4">{player.name}</h1>
                
                <Row className="mb-4">
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-1">Klub</h6>
                        <h5 className="mb-0 fw-bold">{player.club}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-1">Kebangsaan</h6>
                        <h5 className="mb-0 fw-bold">{player.nationality}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col sm={4} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-1">Usia</h6>
                        <h5 className="mb-0 fw-bold">{player.age} tahun</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={4} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-1">Tinggi</h6>
                        <h5 className="mb-0 fw-bold">{player.height}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={4} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-1">Berat</h6>
                        <h5 className="mb-0 fw-bold">{player.weight}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {player.description && (
                  <Card className="border-0 bg-light">
                    <Card.Body>
                      <h5 className="mb-3">Deskripsi</h5>
                      <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        {player.description}
                      </p>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
