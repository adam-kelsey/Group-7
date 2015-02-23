class ArtsController < ApplicationController

  def index
    @arts = Art.all
    respond_to do |format|
      format.json { render json: @arts.to_json }
      format.html
    end
  end

  def create
    @art = Art.create art_params
    respond_to do |format|
      format.json { render json: @art.to_json }
      format.html
    end
  end

  def update
    @art = Art.find params[:id]
    @art.update_attributes art_params
    respond_to do |format|
      format.json { render json: @art.to_json }
      format.html
    end
  end

  def destroy
    @art = Art.find params[:id]
    @art.destroy
    respond_to do |format|
      format.json { render nothing: true }
      format.html
    end
  end

private

  def art_params
    params.require(:art).permit(
      :title,
      :description,
      :artist,
      :dimensions,
      :image_url,
      :bid_amount,
      :bidder,
      :total_amount,
      :bid
    )
  end
end
