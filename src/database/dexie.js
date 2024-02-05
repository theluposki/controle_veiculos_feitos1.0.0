import Dexie from 'dexie';

export const db = new Dexie('VehiclesDB');
db.version(3).stores({
  dados: '++id,marca,placa,qtdPecas,data',
});

db.open().catch((err) => {
  console.error(`Erro ao abrir o banco de dados: ${err.stack || err}`);
});

export async function deleteDataBase() {
  try {
    await Dexie.delete('VehiclesDB');
    return 'Base de dados excluída com sucesso.';
  } catch (error) {
    console.error('Erro ao excluir a base de dados:', error);
  }
}
