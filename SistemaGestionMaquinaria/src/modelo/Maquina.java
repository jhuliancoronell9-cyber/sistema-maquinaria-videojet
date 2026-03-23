package modelo;

public class Maquina {

    private int id;
    private String nombre;
    private String serie;
    private String tipo;
    private String estado;

    public Maquina(int id, String nombre, String serie, String tipo, String estado){
        this.id = id;
        this.nombre = nombre;
        this.serie = serie;
        this.tipo = tipo;
        this.estado = estado;
    }

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getSerie() { return serie; }
    public String getTipo() { return tipo; }
    public String getEstado() { return estado; }

}