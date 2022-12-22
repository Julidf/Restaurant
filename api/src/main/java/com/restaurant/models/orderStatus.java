package com.restaurant.models;

public enum orderStatus {

    EN_PROCESO("En proceso"), COMPLETADO("Completado");

	private String descripcion;

	private orderStatus(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDescripcion() {
		return descripcion;
	}
}
