'use client';

import { Card, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { Player } from '../types/player';

interface PlayerCardProps {
  player: Player;
  onDelete: (id: string) => void;
}

export default function PlayerCard({ player, onDelete }: PlayerCardProps) {
  const getPositionColor = (position: string) => {
    if (position.includes('CF') || position.includes('SS')) return 'danger';
    if (position.includes('AMF') || position.includes('CMF')) return 'warning';
    if (position.includes('CB') || position.includes('GK')) return 'info';
    if (position.includes('WB') || position.includes('LB') || position.includes('RB')) return 'success';
    return 'primary';
  };

  const getOverallColor = (overall: number) => {
    if (overall >= 90) return 'text-danger';
    if (overall >= 85) return 'text-warning';
    if (overall >= 80) return 'text-info';
    return 'text-success';
  };

  return (
    <Card
      className="h-100 shadow-sm border-0 player-card"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="position-relative"
        style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-center text-white">
          <h2 className="mb-0 fw-bold" style={{ fontSize: '3rem' }}>
            {player.overall}
          </h2>
          <Badge bg={getPositionColor(player.position)} className="mt-2">
            {player.position}
          </Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-2" style={{ fontSize: '1.2rem' }}>
          {player.name}
        </Card.Title>
        <div className="mb-2">
          <small className="text-muted d-block">
            <strong>Klub:</strong> {player.club}
          </small>
          <small className="text-muted d-block">
            <strong>Kebangsaan:</strong> {player.nationality}
          </small>
          <small className="text-muted d-block">
            <strong>Usia:</strong> {player.age} tahun
          </small>
        </div>
        <div className="mt-auto pt-3">
          <div className="d-grid gap-2">
            <Link href={`/players/${player.id}`}>
              <Button
                className="w-100"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                }}
              >
                Lihat Detail
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(player.id)}
            >
              Hapus
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

