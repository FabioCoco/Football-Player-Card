import Link from 'next/link';
import { Container, Card, Button } from 'react-bootstrap';

export default function NotFound() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
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
      
      <Container className="text-center position-relative" style={{ zIndex: 1 }}>
        <Card
          className="border-0 shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <Card.Body className="p-5">
            <div className="mb-4">
              <h1
                className="display-1 fw-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '8rem',
                }}
              >
                404
              </h1>
              <h2 className="display-5 fw-bold mb-3">Halaman Tidak Ditemukan</h2>
              <p className="lead text-muted mb-4">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. 
                Halaman mungkin telah dipindahkan atau dihapus.
              </p>
            </div>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/">
                <Button
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.75rem 2rem',
                  }}
                >
                  Kembali ke Home
                </Button>
              </Link>
              <Link href="/players">
                <Button
                  variant="outline-primary"
                  size="lg"
                  style={{
                    borderRadius: '50px',
                    padding: '0.75rem 2rem',
                  }}
                >
                  Lihat Koleksi Pemain
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

