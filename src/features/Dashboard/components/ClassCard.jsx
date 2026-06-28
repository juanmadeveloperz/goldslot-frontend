import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ClassCard({ classItem, onEdit, onDelete }) {
  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{classItem.name}</h3>
          <p className="text-gray-600 text-sm">Profesor: {classItem.professor}</p>
          <p className="text-gray-600 text-sm">Horario: {classItem.schedule}</p>
          <p className="text-gray-600 text-sm">Alumnos: {classItem.studentCount || 0}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(classItem.id)} className="bg-blue-600 text-sm">
            Editar
          </Button>
          <Button onClick={() => onDelete(classItem.id)} className="bg-red-600 text-sm">
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
}