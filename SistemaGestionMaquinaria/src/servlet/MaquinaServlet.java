package servlet;

import dao.MaquinaDAO;
import modelo.Maquina;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

public class MaquinaServlet extends HttpServlet {

    MaquinaDAO dao = new MaquinaDAO();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        String nombre = request.getParameter("nombre");
        String serie = request.getParameter("serie");
        String tipo = request.getParameter("tipo");
        String estado = request.getParameter("estado");

        Maquina m = new Maquina(id, nombre, serie, tipo, estado);

        dao.agregar(m);

        response.sendRedirect("catalogo.jsp");
    }
}