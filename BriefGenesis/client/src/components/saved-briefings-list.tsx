import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { SavedBriefing } from "@shared/schema";
import { ArrowLeft, Calendar, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface SavedBriefingsListProps {
  onBack: () => void;
  onLoadBriefing: (briefing: SavedBriefing) => void;
}

export function SavedBriefingsList({ onBack, onLoadBriefing }: SavedBriefingsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: savedBriefings = [], isLoading } = useQuery({
    queryKey: ["/api/briefings"],
    queryFn: async () => {
      const response = await apiRequest("/api/briefings");
      return await response.json() as SavedBriefing[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/briefings/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/briefings"] });
      toast({
        title: "Briefing excluído",
        description: "O briefing foi removido com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o briefing. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o briefing "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Briefings Salvos</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Carregando briefings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Briefings Salvos</h2>
      </div>

      {!savedBriefings || savedBriefings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Você ainda não salvou nenhum briefing.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              Gere um briefing e clique em "Salvar" para adicioná-lo aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedBriefings.map((briefing) => (
            <Card key={briefing.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{briefing.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onLoadBriefing(briefing)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(briefing.id, briefing.name)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {briefing.area}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {briefing.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {briefing.problem}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(briefing.createdAt), "dd/MM/yyyy")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}