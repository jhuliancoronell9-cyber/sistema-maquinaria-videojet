package dao;

import modelo.Maquina;
import java.util.ArrayList;
import java.util.List;

public class MaquinaDAO {

    public static List<Maquina> lista = new ArrayList<>();

    public void agregar(Maquina m){
        lista.add(m);
    }

    public List<Maquina> listar(){
        return lista;
    }

    public void eliminar(int id){
        lista.removeIf(m -> m.getId() == id);
    }

}