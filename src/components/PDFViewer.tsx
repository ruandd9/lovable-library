import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Maximize2,
  Minimize2,
  Loader2
} from 'lucide-react';

// Configurar o worker do PDF.js usando arquivo local
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log('PDFViewer - pdfUrl:', pdfUrl);
  console.log('PDFViewer - title:', title);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF carregado com sucesso! Páginas:', numPages);
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Erro ao carregar PDF:', error);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'apostila.pdf';
    link.click();
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          
          <div className="px-4 py-2 bg-secondary rounded-lg">
            <span className="text-sm font-medium">
              Página {pageNumber} de {numPages || '...'}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="gap-1"
          >
            Próxima
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <span className="text-sm font-medium px-3">
            {Math.round(scale * 100)}%
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={scale >= 2.0}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar
          </Button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto bg-secondary/30 p-4">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shadow-2xl rounded-lg overflow-hidden bg-white"
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center p-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="ml-2">Carregando PDF...</p>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center p-20 text-destructive">
                  <p>Erro ao carregar PDF.</p>
                  <p className="text-sm mt-2">URL: {pdfUrl}</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                }
              />
            </Document>
          </motion.div>
        </div>
      </div>

      {/* Page Navigation (Bottom) */}
      <div className="flex items-center justify-center gap-2 p-4 bg-card border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber(1)}
          disabled={pageNumber === 1}
        >
          Primeira
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={pageNumber === page ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPageNumber(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ))}
          {numPages > 10 && (
            <span className="text-muted-foreground px-2">...</span>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber(numPages)}
          disabled={pageNumber === numPages}
        >
          Última
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
