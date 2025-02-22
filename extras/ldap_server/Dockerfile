FROM debian:bookworm-slim

# Establecer la variable de entorno DEBIAN_FRONTEND en noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Instalar los paquetes necesarios sin solicitar confirmación
RUN apt-get update && \
    apt-get install -y -q slapd ldap-utils mc nano && \
    rm -rf /var/lib/apt/lists/*

# borramos la carpeta slapd.d
RUN rm /etc/ldap/slapd.d -R

# Copiar la configuración de OpenLDAP
COPY default-slapd /etc/default/slapd

# Copiar la configuración de OpenLDAP
COPY ldap /etc/ldap

# Borramos la base de datos Viejo
RUN rm -rf /var/lib/ldap/*

# Importamos la base de datos nueva a usar
RUN slapadd -l /etc/ldap/export-default.ldif

# Dar permisos a la nueva base de datos
RUN chown -R openldap:openldap /var/lib/ldap && \
    chmod -R 700 /var/lib/ldap
	
# Especificar puntos de montaje para la base de datos y los logs
VOLUME /var/lib/ldap/

# Iniciar el servicio LDAP con mayor nivel de depuración
CMD ["slapd", "-d", "256", "-h", "ldap:///"]
