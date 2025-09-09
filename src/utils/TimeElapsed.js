export const getElapsedTime = (time) => {
    if (!time) return "N/A";

    const entry = new Date(time); 
    const now = new Date();
    const diffMs = now - entry; 

    const seconds = Math.floor(diffMs / 1000) % 60;
    const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    return `${hours}h ${minutes}m ${seconds}s`;
  };